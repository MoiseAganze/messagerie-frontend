export function TrieMessage(list) {
  const listTrie = list.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const groupedMessages = {};
  listTrie.forEach((item) => {
    const date = new Date(item.createdAt);
    const day = date.toISOString().split("T")[0];
    if (!groupedMessages[day]) {
      groupedMessages[day] = [];
    }
    groupedMessages[day].push(item);
  });
  const final_tab = Object.values(groupedMessages);

  return final_tab;
}
