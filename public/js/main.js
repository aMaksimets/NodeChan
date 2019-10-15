$(document).ready(function(){
	$('.delete-thread').on('click', function(e){
		//create event var
		$target = $(e.target);
		const id = $target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url:'/thread/'+id,
			success: function(response){
				alert('Deleting thread');
				window.location.href='/';
			},
			error: function(err){
				console.log(err);
			}
		});
	});
});