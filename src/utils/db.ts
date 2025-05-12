export const buildCommentTree = (comments) => {
  const map = new Map();
  const roots = [];

  comments.forEach((c) => {
    map.set(c.id, { ...c, replies: [] });
  });

  for (const c of comments) {
    const node = map.get(c.id);

    if (c.parentId) {
      const parent = map.get(c.parentId);
      if (parent) {
        parent.replies.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
};
