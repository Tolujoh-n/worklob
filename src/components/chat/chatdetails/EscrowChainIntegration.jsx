import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { JOB_CONTRACT_ADDRESS, JOB_ABI } from "../../Constants";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const workLOB = new ethers.Contract(JOB_CONTRACT_ADDRESS, JOB_ABI, signer);

async function getAmount(jobId) {
  console.log("Fetching amount for jobId:", jobId);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  try {
    let response = await axios.get(
      `${API_URL}/api/v1/jobs/jobdetails/${jobId}`
    );
    console.log("Fetched job Budget:", response.data.budget);

    if (response.data.budget) {
      console.log("Returning fixed budget:", response.data.budget);
      return response.data.budget;
    }

    console.log("Amount not found, attempting fallback...");
    response = await axios.get(`${API_URL}/api/v1/jobs/getAlljobs`);
    const job = response.data.find((job) => job._id === jobId);
    if (job) {
      if (job.rangeCompensation) {
        const amount =
          (job.rangeCompensation.min + job.rangeCompensation.max) / 2;
        console.log(
          "Fallback amount calculated from compensation range:",
          amount
        );
        return amount;
      } else if (job.fixedCompensation) {
        console.log(
          "Fallback amount from fixed compensation:",
          job.fixedCompensation
        );
        return job.fixedCompensation;
      } else if (job.budget) {
        console.log("Fallback amount from job budget:", job.budget);
        return job.budget;
      }
    }

    console.log("No amount found for jobId:", jobId);
    return null;
  } catch (error) {
    console.error("Error fetching job amount:", error);
    return null;
  }
}

export async function deposit(
  jobId,
  customerId,
  talentId,
  customerWallet,
  chatId
) {
  const amount = await getAmount(jobId);
  if (!amount) {
    console.error("Amount not found for jobId:", jobId);
    return;
  }

  console.log("Deposit function triggered with data:");
  console.log({
    jobId,
    customerId,
    talentId,
    customerWallet,
    amount,
    chatId,
  });

  try {
    console.log("Attempting deposit transaction...");
    const tx = await workLOB.deposit(
      jobId, // Now passed as string
      customerId._id, // Now passed as string
      talentId._id, // Now passed as string
      customerWallet,
      ethers.utils.parseEther(amount.toString()),
      chatId, // `chatId` is now a string
      { value: ethers.utils.parseEther(amount.toString()) }
    );
    await tx.wait();

    console.log("Deposit successful!");
  } catch (error) {
    console.error("Error during deposit transaction:", error);
  }
}

export async function complete(
  jobId,
  customerId,
  talentId,
  talentWallet,
  chatId
) {
  console.log("Complete function triggered with data:");
  console.log({
    jobId,
    customerId,
    talentId,
    talentWallet,
    chatId,
  });

  try {
    console.log("Attempting job completion...");
    const tx = await workLOB.complete(
      jobId, // Now passed as string
      customerId._id, // Now passed as string
      talentId._id, // Now passed as string
      talentWallet,
      chatId // `chatId` is now a string
    );
    await tx.wait();

    console.log("Job completion successful!");
  } catch (error) {
    console.error("Error completing job:", error);
  }
}

export async function confirm(
  jobId,
  customerId,
  talentId,
  customerWallet,
  chatId
) {
  console.log("Confirm function triggered with data:");
  console.log({
    jobId,
    customerId,
    talentId,
    customerWallet,
    chatId,
  });

  try {
    console.log("Attempting job confirmation...");
    const tx = await workLOB.confirm(
      jobId,
      customerId,
      talentId,
      customerWallet,
      chatId,
      { gasLimit: 500000 } // Example of setting a higher gas limit
    );
    await tx.wait();

    console.log("Job confirmation successful!");
  } catch (error) {
    console.error("Error confirming job:", error);
  }
}
