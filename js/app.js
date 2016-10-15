 var app = new Vue({
     el:'#app',
     data:{
         countries:[],
         MySearch:'',
         orderCol:'sigla',
         orderInverse:1,
         pagination:{
             maxPage:10,
             current:1,
             totalItems:0,
             totalPages:0,
             listPagination:[]
         }
     },
     methods:{
         filterOrderBy:function(e,col){
             e.preventDefault();
             this.orderCol =  col;
             this.orderInverse = this.orderInverse * -1;
         },
         previous:function(e){
             e.preventDefault();

             if(this.pagination.current === 1){
                 return false;
             }
             
             this.pagination.current = this.pagination.current - 1;
             this.countries = this.pagination.listPagination[this.pagination.current - 1];
         },
         pagePagination:function(e,current){
             e.preventDefault();
             this.pagination.current = current + 1;
             this.countries = this.pagination.listPagination[current];

         },
         next:function(e){
             e.preventDefault();

             if(this.pagination.current === this.pagination.totalPages){
                 return false;
             }
             
             this.pagination.current = this.pagination.current + 1;
             this.countries = this.pagination.listPagination[this.pagination.current - 1];

         }
     },
     ready:function(){
         var self = this;
         self.$http.get('paises-gentilicos-google-maps.json').then(function(response){
             self.pagination.totalItems = response.data.length;
             self.pagination.totalPages = Math.ceil(response.data.length / self.pagination.maxPage);

             var aux = [];
             for(var k in response.data){
                 aux.push(response.data[k]);
                 if(aux.length === self.pagination.maxPage){
                     self.pagination.listPagination.push(aux);
                     aux = [];
                 }
             }
             if(aux.length > 0){
                 self.pagination.listPagination.push(aux);
             }
             self.countries = self.pagination.listPagination[0];
         });
     }
 });