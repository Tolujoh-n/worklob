I have some checks already with the userRole but i wanna add more checks with this (${API_URL}/api/v1/chat/allchats/${userId}) where i can get the applicant role of every jobID, here is the check desciption for each stage before the status can be allowed to change successfully:

1. When the offer button is clicked the userRole must be customer(else throw a message: Switch to Customer role to perform this action) and the ApplicantRole must be Customer (else throw a message: You are not the Customer) before the button click is succeful and do the check one after the other.
2. When the Deposit button is clicked the userRole must be customer(else throw a message: Switch to Customer role to perform this action) and the ApplicantRole must be Customer (else throw a message: You are not the Customer) before the button click is succeful and do the check one after the other.
3. When the In-Progress button is clicked the userRole must be Talent(else throw a message: Switch to Talent role to perform this action) and the ApplicantRole must be Talent (else throw a message: You are not the Talent) before the button click is succeful and do the check one after the other.
4. When the Completed button is clicked the userRole must be Talent(else throw a message: Switch to Talent role to perform this action) and the ApplicantRole must be Talent (else throw a message: You are not the Talent) before the button click is succeful and do the check one after the other.
5. When the Confirmed button is clicked the userRole must be customer(else throw a message: Switch to Customer role to perform this action) and the ApplicantRole must be Customer (else throw a message: You are not the Customer) before the button click is succeful and do the check one after the other.

git checkout d8014b1
