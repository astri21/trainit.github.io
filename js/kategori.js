$(document).ready(function(){

	var _url ="https://www.teamtrainit.com/android/itnews/kategori"
	var dataProduk=""
	var dataKategori=""
	var Kategori = []


	// untuk mengakses url
	$.get(_url, function(data){
		console.log($.parseJSON(data).kategori);
		var hasiljson = $.parseJSON(data);
		if (hasiljson.hasil=="sukses") {
			// digunakan untuk meloop
			$.each(hasiljson.kategori,function(keys,value){
				_kat = value.id_kategori


				dataProduk +="<div>"
				+"<h3>"+value.nama_kategori+"</h3>"
				+"<p>"+_kat+"</p>"+
				"</div>";


				if($.inArray(_kat.id_kategori)== -1){
					Kategori.push(_kat)

					dataKategori+="<option value='"+_kat+"'>"+_kat+"</option>"

				}
			})
			
		}

		$("#produk").html(dataProduk);
		$("#kategori").html("<option value='all'>Semua</option>"+dataKategori);
	})


	$("#kategori").on('change',function(){
		filter($(this).val())
	})


	function filter(kat)
	{
		var _newurl = _url
		var data_Produk =''
		if(kat != "all")
			_newurl = _url+"?kategori="+kat

		
		// untuk mengakses url
		$.get(_newurl, function(data){
		// digunakan untuk meloop
		$.each(data,function(keys,items){
			_kat = items.kategori


			data_Produk +="<div>"
			+"<h3>"+items.nama+"</h3>"
			+"<p>"+_kat+"</p>"+
			"</div>";
		})

		$("#produk").html(data_Produk);
	})	
	}
})
//  end jquery document


// // pwa
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//   	// lokasi file
//     navigator.serviceWorker.register('serviceworkers.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

