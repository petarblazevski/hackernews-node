async function feed(root, args, context, info) {
  const where = args.filter
    ? {
        OR: [{ url_contains: args.filter }, { description_contains: args.filter }]
      }
    : {};

  const queriedLink = await context.db.query.links(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`
  );

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `;

  const linksConnection = await context.db.query.linksConnection({}, countSelectionSet);

  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLink.map(link => link.id)
  };
}

module.exports = {
  feed
};
