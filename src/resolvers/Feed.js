function links(parent, args, context, info) {
  return context.db.query.links({ were: { id_in: parent.linkIds } }, info);
}

module.exports = {
  links
};
