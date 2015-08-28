var Page = (function(){

	function Page(element){
		var self = this;
		self.element = element;
		self.currentPage = null;
		self.prevPage = null;
		element.classList.add('pages');
	}

	Page.prototype.changePage = function(page, callback){
		var self = this;
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if (request.readyState === 4 && (request.status == 200 || request.status == 0 )){
				self.element.innerHTML = request.responseText;
				setTimeout(function() {
					self.element.classList.add('pages--visibility');
				}, 10);
				if (callback){
					callback();
				}
			}
		};
		request.open('GET', page, true);
		request.send();
	}

	Page.prototype.pushPage = function(page, callback){
		var request = new XMLHttpRequest();
		var self = this;

		request.onreadystatechange = function(){
			if (request.readyState === 4 && (request.status == 200 || request.status == 0 )){

				/*var prevPages = document.getElementsByClassName('pages');
		        for (var i = 0; i < prevPages.length; i++){
		            prevPages[i].classList.add('hidden');
		        }*/

				var nextPage = document.createElement("div");
				nextPage.className = 'pages pages--slide-up';
				nextPage.innerHTML = request.responseText;
				document.body.appendChild(nextPage);

				setTimeout(function() {
					nextPage.classList.add('pages--slide-up-show');
				}, 50);

				if (self.currentPage){
					self.prevPage = self.currentPage;
				}
				self.currentPage = nextPage; 

				if (callback){
					callback();
				}

			}
		}

		request.open('GET', page, true);
		request.send();
	}

	Page.prototype.closeCurrentPage = function(){
		var self = this;

		self.currentPage.classList.remove('pages--slide-up-show');
		self.currentPage.addEventListener('webkitTransitionEnd', function(){
				if (self.currentPage){
					self.currentPage.remove();
				}
				self.currentPage = self.prevPage;
		});
			
		self.currentPage.addEventListener('transitionend', function(){
			if (self.currentPage){
				self.currentPage.remove();
			}
			self.currentPage = self.prevPage;
		});

	}

	return Page;

})();

module.exports = Page;