import admin from "../config/firebase.js";

import User from "../models/userModel.js";

const sendNotificationToAll = async (blog) => {
  try {
    const users = await User.find({ fcmToken: { $ne: null } });
    const fcmTokens = users.map((u) => u.fcmToken);

    if (fcmTokens.length == 0) return;

    const message = {
      notification: {
        title: "New Blog Uploaded",
        body: blog.title,
      },
      data:{
        blogId:blog._id.toString()
      },
      tokens: fcmTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Success:", response.successCount);
    console.log("Failed:", response.failureCount);
  } catch (error) {
    console.error("FCM Error:", error);
  }
};

export default sendNotificationToAll;
