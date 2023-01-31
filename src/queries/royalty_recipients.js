export const getDefaultRoyaltyRecipients = `query {
  default_royalty_recipients {
    amount
    address
    name
    id
  }
}`;

export const deleteRoyaltyRecipient = `mutation delete_royalty_recipients($id: uuid!) {
  delete_royalty_recipients_by_pk(id: $id) {
    id
  }
}`;

export const deleteRoyaltyRecipientsByArtwork = `mutation delete_royalty_recipients($artwork_id: uuid!) {
  delete_royalty_recipients(where: {artwork_id: {_eq: $artwork_id }, one_time_payment: {_eq: true}}) {
    returning {
      id
    }
  }
}`


