var itemTemplate = $('#templates .item')
var list         = $('#list')
/*items*/
var addItemToPage = function(itemData) {
  var item = itemTemplate.clone()
    item.attr('data-id',itemData.id)
    item.find('.description').text(itemData.description)
  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
}
/*load request*/
  var loadRequest = $.ajax({
    type: 'GET',
    url: "https://listalous.herokuapp.com/lists/npj90/"
  })

  loadRequest.done(function(dataFromServer) {
    var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
})
/*add item*/
$('#add-form').on('submit', function(event) {
  event.preventDefault()

  var itemDescription = event.target.itemDescription.value
  var creationRequest = $.ajax({
     type: 'POST',
     url: "https://listalous.herokuapp.com/lists/npj90/items",
     data: { description: itemDescription, completed: false }
   })
/*update request for creation*/
  creationRequest.done(function(itemDataFromServer) {
    addItemToPage(itemDataFromServer)
  })
})
/*marking an item complete*/
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
  var isItemCompleted = item.hasClass('completed')
  var itemId = item.attr('data-id')

  var updateRequest = $.ajax({
    type: 'PUT',
    url: "https://listalous.herokuapp.com/lists/npj90/items/" + itemId,
    data: { completed: !isItemCompleted }

  })
/*update request for completion*/
  updateRequest.done(function(itemData) {
    if (itemData.completed) {
      item.addClass('completed')
    } else {
      item.removeClass('completed')
    }
  })
})
/*deleting an item*/
 $('#list').on('click', '.delete-button', function(event) {
  var item = $(event.target).parent()
  var isItemDeleted = item.hasClass('deleted')
  var itemId = item.attr('data-id')

  var result = confirm("Are you sure?");
  if (result) {
  var deleteRequest = $.ajax({
    type: 'DELETE',
    url: "https://listalous.herokuapp.com/lists/npj90/items/" + itemId,
    data: { description: !isItemDeleted }
  })
}
/*update request for deletion*/

})

/*Allow to sort items*/

/*Allow unique users and lists*/

/*update edited items to server*/
