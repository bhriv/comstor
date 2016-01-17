/**
 * Author: Bret Van Horn
 * 
 */
$( document ).ready(function() {
	var actor = user.email; //user.email;
	var mode;
	var pcid;
	
	setVarsFromLocalStorage();

	var base_url = urls.messaging;
    var attachment_url = urls.attachment;
	var mid = message.id; // individual message id
	// message actions
	var url_message_full = base_url + "message/"+mid; // returns full message; arg = message id
	var url_message_send = base_url + "message/"; // sends message
	var url_message_reply = base_url + "reply/"; // REPLY - POST DATA
	var url_message_delete = base_url + "message/remove/"; // ID - DELETE - POST DATA
	// message filter views
	var url_messages_10 = base_url + "messages"; // returns 10 summaries
	var url_messages_plan = base_url + "message/plan/"; // All messages in a plan; arg = plan id
	var url_messages_course = base_url + "message/course/"; // All messages in a course; arg = course id
	var url_messages_session = base_url + "message/session/"; // All messages in a plan; arg = plan id
	var url_messages_actor = base_url + "message/actor/"; // All messages in a course; arg = course id
	// inbox
	var url_messages_inbox = base_url + "message/actor/"+actor; // All messages TO an actor - INBOX; arg = actor email
	var url_messages_inbox_plan = base_url + "message/plan/"; // All messages within plan - inbox
	var url_messages_inbox_course = base_url + "message/course/"; // All messages within course plan - inbox
	var url_messages_inbox_session = base_url + "message/session/"; // All messages within course plan - inbox
	var url_messages_inbox_actor = base_url + "message/actor/"; // All messages within course plan - inbox
	// notifications
	var url_messages_note = base_url + "notification/actor/"+actor; // All messages TO an actor - INBOX; arg = actor email
	var url_messages_note_plan = base_url + "notification/plan/"; // All messages within plan - inbox
	var url_messages_note_course = base_url + "notification/course/"; // All messages within course plan - inbox
	var url_messages_note_session = base_url + "notification/session/"; // All messages within course plan - inbox
	var url_messages_note_actor = base_url + "notification/actor/"; // All messages within course plan - inbox
	// sent
	// most of these don't have endpoints yet, so we just load all sent for each filter. 
	var url_messages_sent = base_url + "message/sender/"+actor; // All messages within course plan - sent
	var url_messages_sent_course = base_url + "message/sender/"+actor; // All messages within course plan - sent
	var url_messages_sent_session = base_url + "message/sender/"+actor; // All messages within course plan - sent
	var url_messages_sent_actor = base_url + "message/sender/"+actor; // All messages within course plan - sent
	//attachments
	var url_lookup_attachments = base_url + "message/attachments/"; // Look up all attachment IDs for a message
	var url_get_attachment = attachment_url+"metadata/"; // Get attachment for a message
	var url_file_upload = attachment_url+'attachment';
	var url_get_sender_photo = '/app_dev.php/messages/actorphoto/';
	var upload_user = 'lumious';
	var upload_pass = '0zdkkINkN8y5qmOS';
	var loader = $('.loading');
	var empty = $('.empty');
	var notified = new Array();
	var uploaded_files = new Array();
	// instantiate dropzone so we can do stuff
	//var myDropzone = new Dropzone("#attachment-form", { url: "https://playground.learningconsole.com/lumiousattachment/"});
	// disable auto processing
	// Dropzone.options.myDropzone = false;
	
	// map priorities to gumby indicator css classes
	var priority_map = {
		Low : 'default',
		Normal : 'primary',
		High : 'danger'
	}

	var priority_icon_map = {
		Low : 'down',
		Normal : 'mail',
		High : 'attention'
	}

	var attachment_icon_map = {
		jpeg : 'image',
		jpg : 'image',
		png : 'image',
		gif : 'image',
		tiff : 'image',
		tif : 'image',
		bmp : 'image',
		pdf : 'pdf',
		zip : 'zip',
		csv : 'excel',
		word : 'word',
		mpeg : 'audio',
		mp3 : 'audio',
		quicktime : 'video',
		mp4 : 'video'
	}


	// set up remediation and challange plan select menus for forms
	var plantypeform = $('.chalrem-form');
	var plantypeselectmenu = $('.chalrem-form #PlanID');
	plantypeform.each(function(){
		var pmode = $(this).attr('data-type');
		var post_url = base_url + pmode + 'plan/';
		var thisform = $(this);
		$.ajax({
		    url: post_url,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       $.each(result, function(i, val) {
		       		thismenu = $(thisform).find('#PlanID');
		       		thismenu.append('<option value="'+val.ID+'">'+val.name+'</option>');	
		       });
		   	}
		});
	});	

	// MESSAGES INBOX FOR CURRENT USER
	if($('#messages-inbox #messages-body').length){
		tmpurl = mailPrep();
		checkMail(tmpurl);
		var checker = setInterval(function() { checkMail(tmpurl) }, 60000);
	}

	// MESSAGES SENT FOR CURRENT USER
	if($('#messages-sent #messages-body').length){
		tmpurl = mailPrep();
		checkMail(url_messages_sent);
		//var checker = setInterval(checkMail, 60000);
	}

	// NOTIFICATIONS FOR CURRENT USER
	if($('#messages-note #messages-body').length){
		tmpurl = mailPrep();
		checkMail(url_messages_note);
		//var checker = setInterval(checkMail, 60000);
	}

	// REFRESH INBOX EVENT LISTENER
	$('#messages-inbox .refresh-inbox').on("click", function(e){
		e.preventDefault();
		tmpurl = mailPrep();
		checkMail(tmpurl);
	});

	// MESSAGE DETAIL
	if($('#widget-message-detail').length){
		$.getJSON( url_message_full, function( json ) {	
			var replytext = "";
			var replytextfield = $('#message-reply-text');
			var replytofield = $('#reply-to');
			var replysubjectfield = $('#reply-subject');
			var replymessageidfield = $('#reply-id');
			var attachmentcontainer = $('#attachments');
			console.log(json);

			jQuery.each(json, function(i, val) {
				//console.log(val.Attachment);
				if(val.Attachment != "0"){
					console.log('checking attachments...');
					attachmentcontainer.show();
					getAttachments(val.ID);
				}else{
					console.log('not checking attachments...');
					attachmentcontainer.hide();
				}
				replytext = "<br><br><strong>On "+val.Time_Initiated+", "+val.From+" wrote:</strong><br>";
				// grab sender's photo for display
				$.ajax({
				    url: url_get_sender_photo+val.From,
				    type: 'GET',
				    success: function(result) {
				    	val.Senderphoto = '<img src="'+result+'">';
				    	// bind data to table template
						dna.clone('widget-message-detail', val, {html: true, fade: true});
					}
				});
				replytext += quoteReply(val.Message);
				replytextfield.val(replytext);
				replytofield.val(val.From);
				replysubjectfield.val('Re: '+val.Subject);
				replymessageidfield.val(val.ID);
			});
		});
	}
	// SEND NEW MESSAGE 
	$('#message-form').on('submit', function(e){
		e.preventDefault();
		var active_uploads = $('#fileupload').fileupload('active');
		console.log('total current uploads: '+active_uploads);
		var obj = $(this);

		if(active_uploads > 0){
			$('#fileupload').bind('fileuploadstop', function (e, data) {
				console.log('uploads done....');
				console.log(uploaded_files);
				messageSend(obj);
			});
		}else{
			console.log("no uploads in process");
			messageSend(obj);
		}
		
	});


	// SEND REPLY
	$('#reply-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		var id = $form.find( "input[name='MessageID']" ).val();
		var to = $form.find( "input[name='To']" ).val();
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var priority = $( "#Priority option:selected" ).text();
		var data = {
			MessageID: id,
			To: to,
			From: from,
			Subject: subject,
			Message: message,
			Type: 'Message',
			Priority: priority
		}
		var send = $.post(url_message_reply, data, function(response){
			//console.log(response);
			window.location = "/app_dev.php/messages/home";
			//checkMail();
		}).fail(function(){
			alert("Your message was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
		
	});

	// SEND HELP/CONTACT/SUGGESTION REQUEST
	$('#messaging-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		var mode = $(this).attr('class');
		var post_url = base_url + mode + '/';
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var data = {
			From: from,
			Subject: subject,
			Message: message,
		}
		var send = $.post(post_url, data, function(response){
			//console.log(response);
			$('#messaging-form').trigger('reset');
			for (instance in CKEDITOR.instances){
   				CKEDITOR.instances[instance].setData(" ");
			}
			alert("Your was successfully sent. You will receive a response soon.");
			//checkMail();
		}).fail(function(){
			alert("Your request was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
	});

	// SEND CHALLENGE OR REMEDIATION
	$('.chalrem-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		var mode = $(this).attr('data-type');
		var post_url = base_url + mode + '/';
		//console.log(post_url);
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var to = $form.find( "input[name='To']" ).val();
		var planid = $form.find( "#PlanID" ).val();
		var data = {
			To: to,
			From: from,
			Subject: subject,
			Message: message,
			PlanID: planid,
			SendMail: 1
		}
		//console.log(data);
		var send = $.post(post_url, data, function(response){
			//console.log("response from sending:");
			//console.log(response);
			$('.chalrem-form').trigger('reset');
			for (instance in CKEDITOR.instances){
   				CKEDITOR.instances[instance].setData(" ");
			}
			$form.parent().parent().removeClass('active');
			alert("Your "+mode+" was successfully sent.");
			//checkMail();
		}).fail(function(){
			alert("Your request was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
	});

	// DELETE MESSAGE 
	$('body').on('click','.message-delete',function(e){
		$.support.cors = true;
		e.preventDefault();
		var id = $(this).attr('data-id');
		if(window.confirm("Are you sure you want to delete this message? Deletions cannot be undone. Proceed?")){
			var dstatus = deleteAttachments(id);
			console.log(dstatus);
			if(dstatus == "okay"){
				console.log("attachments deleted");
			}else{
				console.log("attachments NOT deleted");
			}
			$.ajax({
			    url: url_message_delete+id,
			    type: 'GET',
			    success: function(result) {
			       // Do something with the result
			       // console.log(result);
			       // window.location = "/Symfony/web/app_dev.php/messages/home";
			       if($('body').hasClass('sent')){
			       		url = url_messages_sent;
			       }else{
			       		url = url_messages_inbox;
			       }
			       checkMail(url);
			   	}
			});
		}
	});

	function mailPrep(){
		setVarsFromLocalStorage();
		if(mode == "plan"){
			tmpurl = url_messages_inbox_plan+pcid;
		}else if(mode == "courseplan"){
			tmpurl = url_messages_inbox_course+pcid;
		}else if(mode == "sessionplan"){
			tmpurl = url_messages_inbox_session+pcid;
		}else if(mode == "actorplan"){
			tmpurl = url_messages_inbox_actor+pcid;
		}else{
			tmpurl = url_messages_inbox;
		}
		console.log('checking this:'+tmpurl);

		return tmpurl;
	}

	window.mailPrep = mailPrep;

	// return attachments
	function getAttachments(message_id){
		console.log('getting attachments...');
		// look up attachments for message from Bruce's API
		var attachment_links = new Array();
		var attach_lookup_url = url_lookup_attachments + message_id;
		$.ajax({
		    url: attach_lookup_url,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       jQuery.each(result, function(i, val) {
		       		// loop through and get actual attachments from Chris's API
					attach_url = url_get_attachment + val.AttachmentID;
					console.log("loading: "+attach_url);
					var adata = $.ajax({
					    url: attach_url,
					    type: 'GET',
					    autoSubmit: false,
					    xhrFields: {
					        withCredentials: true
					    },
					    beforeSend: function (xhr) { 
					        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(upload_user + ":" + upload_pass));             
					    },
					    crossDomain: true,
					    success: function(result) {
					    	var aname = result.filename;
					    	var atype = result.mimetype.split('/');
					    	var asize = Math.round((result.filesize / 1048576) * 100) / 100;
					    	var sizetype = "mb";
					    	if(asize < 1){
					    		asize = Math.round((result.filesize / 1024) * 100) / 100;
					    		sizetype = "kb";
					    	}
					    	console.log(atype[1]);
					    	var icon = getIcon(atype[1]);
					    	var tmp = '<li><a href="/app_dev.php/messages/attachment/'+val.AttachmentID+'" class="ttip switch" data-tooltip="'+aname+' | '+asize+' '+sizetype+'"><i class="fa fa-file-'+icon+'o fa-2x"></i></a></li>'
					       	$(".message-attachments").append(tmp);
					    	console.log(tmp);
					   	}
					});
		       });
		   	}
		});
	}

	// delete attachments
	function deleteAttachments(message_id){
		console.log('getting attachments...');
		// look up attachments for message from Bruce's API
		var attachment_links = new Array();
		var attach_lookup_url = url_lookup_attachments + message_id;
		var status = false;
		$.ajax({
		    url: attach_lookup_url,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       jQuery.each(result, function(i, val) {
		       		// loop through and get actual attachments from Chris's API
					attach_url = url_file_upload + "/" + val.AttachmentID;
					console.log("deleting: "+attach_url);
					var adata = $.ajax({
					    url: attach_url,
					    type: 'DELETE',
					    autoSubmit: false,
					    xhrFields: {
					        withCredentials: true
					    },
					    beforeSend: function (xhr) { 
					        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(upload_user + ":" + upload_pass));             
					    },
					    crossDomain: true,
					    success: function(result) {
					    	console.log(result.status);
					    	status = result.status;
					   	},
					   	error: function(result) {
					   		console.log(result.status);
					   	}
					});
		       });
		   	}
		});
		return status;
	}

	function setVarsFromLocalStorage(){
		mode = checkLocalStorage('filter_mode');

		if(mode == 'plan'){
			pcid = checkLocalStorage('current_plan');
		}else if(mode == 'courseplan'){
			pcid = checkLocalStorage('current_course');
		}else if(mode == 'sessionplan'){
			pcid = checkLocalStorage('current_session');
		}else if(mode == 'actorplan'){
			pcid = checkLocalStorage('current_actor');
		}else{
			pcid = "";
		}
	}

	window.setVarsFromLocalStorage = setVarsFromLocalStorage;

	// this does the heavy lifting for message sending so it can be reused and called from callback methods
	function messageSend(obj){
		var $form = $(obj);
		var to = $form.find( "input[name='To']" ).val();
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var priority = $( "#Priority option:selected" ).text();

		var data = {
				To: to,
				From: from,
				Subject: subject,
				Message: message,
				Type: 'Message',
				Priority: priority,
				Attachment: uploaded_files
		}
		console.log(data);
		var send = $.post(url_message_send, data, function(response){
			console.log(response);
			window.location = "/app_dev.php/messages/home";
			//checkMail();
		}).fail(function(){
			alert("Your message was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
	}

	// function to check email
	function checkMail(url){
		console.log("checking mail...");
		var notify = false;
		hideEmptyMessage();
		dna.empty('messages-body', { fade: true });
		showLoader();
		// console.log("checking mail...");
		// console.log("notified messages: ");
		// console.log(notified);
		$.getJSON( url, function( json ) {
			//console.log(json);
			if(json.length !== 0){
				jQuery.each(json, function(i, val) {
					// this is hacky, but dnajs
					if(val.Read == "0"){
						val.Read = 'unread';
						if($.inArray(val.ID,notified) === -1){
							notify = true;
							notified.push(val.ID);
						}
					}else{
						val.Read = 'read';
					}
					// reassign priority variable to contain html needed to display proper icons
					val.Priority = '<span class="'+priority_map[val.Priority]+' badge"><i class="icon-'+priority_icon_map[val.Priority]+'"></i></span>';
					
					/*if(val.Attachment != "0"){
						val.Attachmentcode = '<i class="icon-attach"></i>';
					}else{
						val.Attachmentcode = "";
					}*/

					// grab sender's photo for display
					$.ajax({
					    url: url_get_sender_photo+val.From,
					    type: 'GET',
					    success: function(result) {
					    	val.Senderphoto = '<img src="'+result+'">';
					    	// bind data to table template
							dna.clone('messages-body', val, {html: true, fade: true});
							// update table so sorting works after ajax call
							 $("#sortable").trigger("update"); 
				            // set sorting so new messages appear at top 
				            var sorting = [[3,1]]; 
				            $("#sortable").trigger("sorton",[sorting]); 
					    }
					});
					
				});
				if(notify){
					// play audio notification for unread message(s)
					//audio.play();
				}
			}else{
				showEmptyMessage();
			}
		});
		hideLoader();
	}

	window.checkMail = checkMail;

	// upload files
	$('#fileupload').fileupload({
        url: url_file_upload,
        dataType: 'json',
	    /*username: upload_user,
	    password: upload_pass,*/
        autoSubmit: false,
        xhrFields: {
	        withCredentials: true
	    },
	    beforeSend: function (xhr) { 
	        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(upload_user + ":" + upload_pass));  
	    },
	    crossDomain: true,
	    submit: function (e, data) {
	    	$.each(data.files, function (index, file) {
        		console.log('Added file: ' + file.size);
        		// customize the url to append the metadata to the URL for quicker link building
        		data.url = url_file_upload+"?filename="+file.name+"&mimetype="+file.type+"&filesize="+file.size;
		    });
	    },
        done: function (e, data) {
        	console.log(data.files.file);
        	uploaded_files.push(data.result.id);
        	$.each(data.files, function (index, file) {
	            $('<p/>').html('<i class="icon-check"></i>'+file.name).appendTo('#files');
	        });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        },
        error: function (request, textStatus, errorThrown) {
	        console.log(request.responseText);
	        console.log(textStatus);
	        console.log(errorThrown);
	    }
	    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

	function getIcon(key){
		if(attachment_icon_map[key] !== undefined){
			return attachment_icon_map[key]+"-";
		}else{
			return "";
		}
	}

	// utility functions

	// LOADING ANIMATION
	function showLoader(){
		//console.log("showing loader...");
		loader.fadeIn();
	}

	function hideLoader(){
		//console.log("hiding loader...");
		loader.fadeOut();
	}

	function showEmptyMessage(){
		empty.fadeIn();
	}

	function hideEmptyMessage(){
		empty.fadeOut();
	}

	// FORMAT QUOTED TEXT
	function quoteReply(text){
		var len = text.length;
		var linelen = 72;
		var textpart = "";
		var quoted;
		text = text.replace("<p>","");
		text = text.replace("</p>","");
		if(len > linelen){
			for(i=0; i<len; i+=linelen){
				//console.log(i);
				textpart += "&gt; "+text.substr(i,linelen)+"<br>";
				//console.log(textpart);
			}
		} else {
			textpart = "&gt; "+text+"<br>";
		}
		quoted = textpart;
		//console.log(quoted);//
		return quoted;
	}

	// function to query localstorage for a given variable
	function checkLocalStorage(item){
		var thisitemval = JSON.parse(localStorage.getItem(item));
		// if local storage empty
		if(thisitemval === null){
			return '';
		}else{
			return thisitemval;
		}
	}
});
