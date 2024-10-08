"use server";

import connectDB from "../db";
import { getSession } from "../getSession";

export async function recruitAction(formData: FormData) {
  const lectureId = formData.get("lectureId");
  const category = formData.get("category");
  const imageUrl = formData.get("imageUrl");
  const title = formData.get("title");
  const description = formData.get("introduction");
  const format = formData.get("progressWay");
  const platform = formData.get("online");
  const location = formData.get("address");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const day = formData.get("day");
  const time = formData.get("time");
  const moodData = formData.get("selectedMood");
  const taskData = formData.get("selectedAssignment");
  const moodKeywords = typeof moodData === "string" ? (moodData.length > 0 ? moodData.split(",") : null) : null;
  const tasks = typeof taskData === "string" ? (taskData.length > 0 ? taskData.split(",") : null) : null;
  const careerData = formData.get("career");
  const career = typeof careerData === "string" ? careerData.split(",") : [];
  const count = formData.get("numberOfTeamMembers");
  const ageData = formData.get("ages");
  const roleData = formData.get("role");
  const age = typeof ageData === "string" ? ageData.split(",") : [];
  const role = typeof roleData === "string" ? roleData.split(",") : [];

  await connectDB();

  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error("유저 정보가 없습니다.");

  const newStudy = {
    category: category,
    ownerId: userId,
    lectureId: lectureId,
    title: title,
    imageUrl: imageUrl,
    description: description,
    meeting: {
      format: format,
      platform: platform,
      location: location,
      schedule: {
        day: day,
        time: time,
      },
    },
    startDate: startDate,
    endDate: endDate,
    moodKeywords: moodKeywords,
    task: tasks,
    wantedMember: {
      career: career,
      count: count,
      age: age,
      role: role,
    },
    status: "RECRUIT_START",
    scrapCount: 0,
  };

  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudy),
    });

    if (!response.ok) {
      throw new Error("스터디 개설 실패");
    }

    const data = await response.json();
    return data.study;
  } catch (error: any) {
    console.error("Error fetching study:", error.message);
    throw error;
  }
}
