// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IWorkLobERC20
 * @dev Simplified ERC20 interface.
 */
interface IWorkLobERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient, 
        uint256 amount
    ) external returns (bool);
}

/**
 * @title Ownable
 * @dev Basic access control mechanism with an owner.
 */
contract Ownable {
    address public owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

/**
 * @title WorkLobStaking
 * @dev A staking contract where users can stake tokens to earn rewards.
 */
contract WorkLobStaking is Ownable {
    IWorkLobERC20 public token;

    // Reward parameters
    uint256 public rewardRate;           // Reward tokens distributed per second.
    uint256 public periodFinish;         // Timestamp when the current reward period ends.
    uint256 public lastUpdateTime;       // Last timestamp that rewards were updated.
    uint256 public rewardPerTokenStored; // Accumulated reward per staked token (scaled by 1e18).

    // Total tokens staked by all users.
    uint256 public totalStaked;

    // User-specific data
    struct Staker {
        address stakerAddress;
        uint256 stakedAmount;
        uint256 rewardsEarned;
        uint256 duration;
        bool isActive;
    }

    address[] public stakerAddresses;
    mapping(address => Staker) public stakers;
    mapping(address => uint256) public userRewardPerTokenPaid; // User's snapshot of rewardPerTokenStored.
    mapping(address => uint256) public rewards;                // Accumulated (but not yet claimed) rewards.

    // Events to log key actions
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardAdded(uint256 rewardAmount, uint256 duration);

    /**
     * @dev Constructor sets the ERC20 token used for staking and rewards.
     * @param _token The ERC20 token address.
     */
    constructor(IWorkLobERC20 _token) {
        token = _token;
    }

    /**
     * @dev Returns the last time reward was applicable (current time or period finish, whichever is lower).
     */
    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    /**
     * @dev Calculates the current reward per token accumulated.
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18) / totalStaked);
    }

    /**
     * @dev Returns the total rewards earned by an account.
     * @param account The address of the staker.
     */
    function earned(address account) public view returns (uint256) {
        return ((stakers[account].stakedAmount * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) + rewards[account];
    }

    /**
     * @dev Updates the reward variables for an account.
     * @param account The address to update rewards for.
     */
    function updateReward(address account) internal {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
    }

    /**
     * @dev Stake a specific amount of tokens.
     * @param amount The number of tokens to stake.
     */
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        updateReward(msg.sender);
        // Transfer tokens from user to this contract.
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        totalStaked += amount;
        
        if (!stakers[msg.sender].isActive) {
            stakers[msg.sender] = Staker(msg.sender, amount, 0, block.timestamp, true);
            stakerAddresses.push(msg.sender);
        } else {
            stakers[msg.sender].stakedAmount += amount;
        }

        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Withdraw staked tokens.
     * @param amount The number of tokens to withdraw.
     */
    function withdraw(uint256 amount) public {
        require(amount > 0, "Cannot withdraw 0");
        require(stakers[msg.sender].stakedAmount >= amount, "Insufficient staked balance");
        updateReward(msg.sender);
        stakers[msg.sender].stakedAmount -= amount;
        totalStaked -= amount;
        if (stakers[msg.sender].stakedAmount == 0) {
            stakers[msg.sender].isActive = false;
        }
        require(token.transfer(msg.sender, amount), "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    /**
     * @dev Claim accumulated reward tokens.
     * @param stakeAmount The specific stake amount to claim rewards for.
     */
    function claimReward(uint256 stakeAmount) public {
        require(stakers[msg.sender].stakedAmount >= stakeAmount, "Insufficient staked balance");
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            require(token.transfer(msg.sender, reward), "Reward transfer failed");
            emit RewardPaid(msg.sender, reward);
        }
    }

    /**
     * @dev Claim all accumulated reward tokens.
     */
    function claimAllRewards() public {
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            require(token.transfer(msg.sender, reward), "Reward transfer failed");
            emit RewardPaid(msg.sender, reward);
        }
    }

    /**
     * @dev Fetch all stakers' data.
     * @return An array of stakers.
     */
    function getAllStakers() public view returns (Staker[] memory) {
        Staker[] memory stakerArray = new Staker[](stakerAddresses.length);
        for (uint256 i = 0; i < stakerAddresses.length; i++) {
            address stakerAddr = stakerAddresses[i];
            stakerArray[i] = stakers[stakerAddr];
        }
        return stakerArray;
    }

    /**
     * @dev Fetch a specific staker's portfolio.
     * @param staker The address of the staker.
     * @return The staker's data.
     */
    function getStakerPortfolio(address staker) public view returns (Staker memory) {
        return stakers[staker];
    }

    /**
     * @dev Owner-funded reward deposit.
     * The owner (platform treasury) can deposit reward tokens to fund the reward pool.
     * If the current reward period is still active, any leftover rewards are added.
     * @param rewardAmount The total reward tokens to be distributed.
     * @param duration The duration (in seconds) over which to distribute the rewards.
     */
    function notifyRewardAmount(uint256 rewardAmount, uint256 duration) external onlyOwner {
        // Update reward variables before modifying reward parameters.
        updateReward(address(0));

        // If the previous reward period is still running, add any leftover rewards.
        if (block.timestamp >= periodFinish) {
            rewardRate = rewardAmount / duration;
        } else {
            uint256 remaining = periodFinish - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (rewardAmount + leftover) / duration;
        }

        // Ensure the contract has enough tokens to cover the new rewards.
        uint256 availableBalance = token.balanceOf(address(this));
        require(rewardRate * duration <= availableBalance, "Not enough tokens for reward");

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp + duration;
        emit RewardAdded(rewardAmount, duration);
    }
}
