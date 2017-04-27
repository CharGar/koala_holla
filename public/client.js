$(document).ready(onReady);

function onReady(){
  $('#submit').on('click', addKoala);
  $(document).on('click','.delete',relocate);
  getKoalas();
}

function getKoalas(){
  $.ajax({
    url:"/koala",
    type: "GET",
    success: function(res) {
      console.log("in getKoalas:", res);

      $('.container').empty();

      for (var i = 0; i < res.length; i++) {
        $('.container').append('<div><p>Name: ' + res[i].name + ' | Sex: ' + res[i].sex +
         ' | Age: ' + res[i].age + ' | Ready For Transfer: ' + res[i].ready_for_transfer +
          ' | Notes: ' + res[i].notes + '</p></div><button class="delete" data-koalaid="'+res[i].id+'">Relocate</button>');
      }
    }
  });
}//end function

function addKoala(){

  var objectToSend = {
    name: $('#name').val(),
    sex: $('#sex').val(),
    age: $('#age').val(),
    transfer: $('#transfer').val(),
    notes: $('#notes').val(),
  };

  $.ajax({
    url:"/addingKoala",
    type: "POST",
    data: objectToSend,
    success: function(res) {
      console.log("adding koalas", res);
      getKoalas();
    }
  });
}

function relocate(){
  var myID = $(this).data('koalaid');
  console.log('remove', myID);
  //send id to server
  $.ajax({
    url: '/remove',
    type: 'DELETE',
    data: {id: myID},
    success: function(res){
      console.log(res);
      getKoalas();
    }
  });
}
