export default function getNewItemQuery(
  data,
  category,
  transformedDate,
  itemCreatorQuestion,
  type
) {
  return {
    query: `
        mutation CreateItem($description: String! , $category: String!, $location:String, $date: String!, $itemCreatorQuestion: String!, $type: String!) {
          createItem(
            itemInput:
              {description: $description,
              type: $type,
              category: $category,
              location: $location,
              date: $date,
              itemCreatorQuestion: $itemCreatorQuestion }) {
                _id
                description
                type
                category
                location
                date
                itemCreatorQuestion
          }
        }
      `,
    variables: {
      description: data.description,
      category: category.categoryName,
      location: data.location,
      date: transformedDate,
      itemCreatorQuestion: itemCreatorQuestion,
      type: type,
    },
  };
}
