$(document).ready(function(){

	var _url ="https://my-json-server.typicode.com/astri21/pwa/produk"
	var dataProduk=""
	var dataKategori=""
	var Kategori = []

	function renderPage(data){
		// digunakan untuk meloop
		$.each(data,function(keys,items){
			_kat = items.kategori


			dataProduk +="<div>"
			+"<h3>"+items.nama+"</h3>"
			+"<p>"+_kat+"</p>"+
			"</div>";


			if($.inArray(_kat,kategori)== -1){
				Kategori.push(_kat)

				dataKategori+="<option value='"+_kat+"'>"+_kat+"</option>"

			}
		})

		$("#produk").html(dataProduk);
		$("#kategori").html("<option value='all'>Semua</option>"+dataKategori);	
	}

	var networkDiterima = false

	var networkUupdate =  fetch(_url).then(function(response){
		return response.json()
	}).then(function(data){
		networkDiterima=true

		renderPage(data)
	})


	// return data from cahce

	caches.match(_url).then(function(response){
		if(!response) throw Error('no data on cache')
			return response.json()
	}).then(function(data){
		if(!networkDiterima){
			renderPage(data)

			console.log('render data form cache')
		}
	}).catch(function(){
		return networkUupdate
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


// pwa
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
  	// lokasi file
  	navigator.serviceWorker.register('serviceworkers.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
  });
  });
}

