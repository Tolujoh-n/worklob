// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WorkLOB {
    struct Job {
        uint256 jobId;
        uint256 customerId;
        uint256 talentId;
        address customerWallet;
        address talentWallet;
        uint256 amount;
        uint256 status; // 0: Not started, 1: Deposited, 2: Completed, 3: Confirmed
        uint256 chatId;
    }

    mapping(uint256 => Job) public jobs;
    address public LOBToken;
    address public owner;
    uint256 public rewardAmount = 500; // Reward amount of LOB tokens

    constructor(address _LOBToken) {
        LOBToken = _LOBToken;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function deposit(uint256 _jobId, uint256 _customerId, uint256 _talentId, address _customerWallet, uint256 _amount, uint256 _chatId) public payable {
        require(msg.value == _amount, "Amount mismatch");
        Job storage job = jobs[_jobId];
        job.jobId = _jobId;
        job.customerId = _customerId;
        job.talentId = _talentId;
        job.customerWallet = _customerWallet;
        job.amount = _amount;
        job.chatId = _chatId;
        job.status = 1;
    }

    function complete(uint256 _jobId, uint256 _customerId, uint256 _talentId, address _talentWallet, uint256 _chatId) public onlyOwner {
        Job storage job = jobs[_jobId];
        require(job.customerId == _customerId && job.talentId == _talentId, "Invalid customer or talent ID");
        require(job.status == 1, "Job is not deposited yet");
        job.talentWallet = _talentWallet;
        job.chatId = _chatId;
        job.status = 2;
    }

    function confirm(uint256 _jobId, uint256 _customerId, uint256 _talentId, address _customerWallet, address _talentWallet, uint256 _chatId) public onlyOwner {
        Job storage job = jobs[_jobId];
        require(job.customerId == _customerId && job.talentId == _talentId, "Invalid customer or talent ID");
        require(job.status == 2, "Job is not completed yet");
        job.customerWallet = _customerWallet;
        job.talentWallet = _talentWallet;
        job.chatId = _chatId;
        job.status = 3;

        uint256 amountToTalent = (job.amount * 95) / 100;
        uint256 remainingAmount = job.amount - amountToTalent;

        payable(job.talentWallet).transfer(amountToTalent);
        payable(owner).transfer(remainingAmount);

        ILOBToken(LOBToken).transfer(job.customerWallet, rewardAmount);
        ILOBToken(LOBToken).transfer(job.talentWallet, rewardAmount);
    }
}

interface ILOBToken {
    function transfer(address recipient, uint256 amount) external returns (bool);
}
