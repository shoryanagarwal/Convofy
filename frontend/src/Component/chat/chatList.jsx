const openChat = async (user) => {
  try {
    setMessages([]);
    setSelectedUser(user);

    const res = await api.post("/chat/oneonone", {
      userId: user._id
    });

    setSelectedChat(res.data.data);
    setActivePanel("chat");
  } catch (error) {
    console.log(error);
  }
};