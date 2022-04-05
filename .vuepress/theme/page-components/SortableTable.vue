<!--

It shouldn't be hard to implement a sortable table, but I tried several libraries that all failed in different ways, mostly related to incompatibility with VuePress v2.

The implementation below isn't particularly clever, and can be replaced with something else if you can get it to work.  In particular, Vuetify includes sortable tables, and it would be good to include it here once Vuetify V3.0 is out: https://vuetifyjs.com/en/introduction/roadmap/

-->

<template>
  <table class="sortable-table">
   <thead>
    <tr>
      <th
         v-for="column in columns"
         :key="column"
         @click="manage_sorting(column)"
         class="sortable-table-link"
         >
         <div class="sortable-header">
           <svg height="12" width="10" :class="`sortable-button sortable-${sort==column.key} rev-${sort_reversed}`">
             <polygon points="0,5 5,0 10,5" class="sortable-up" />
             <polygon points="0,7 5,12 10,7" class="sortable-down" />
           </svg>
           <div class="sortable-title">{{column.value}}</div>
         </div>
      </th>
    </tr>
   </thead>
   <tbody>
    <tr v-for="row in sorted_rows" :key="row.id">
      <td v-for="column in columns" :key="column.key" v-html="get_value(row[column.key])"/>
    </tr>
   </tbody>
  </table>
</template>

<style>
.sortable-table td:not(:nth-child(1)) {
  text-align: center;
}
.sortable-table-link {
  cursor: pointer;
}
.sortable-header {
  position: relative;
}
.sortable-title {
  padding-right: 16px;
}
.sortable-button {
  position: absolute;
  width: 10px;
  height: 12px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
 }
.sortable-button polygon {
  fill: grey;
}
.sortable-button.sortable-true.rev-false polygon.sortable-down,
.sortable-button.sortable-true.rev-true polygon.sortable-up {
  fill: black;
}
.dark .sortable-button.sortable-true.rev-false polygon.sortable-down,
.dark .sortable-button.sortable-true.rev-true polygon.sortable-up {
  fill: #ccc;
}
.not-key {
  visibility:hidden;
}
</style>
<script>
export default {
 props: ['columns','rows'],
 data() {
   return {
     sort: '',
     sort_reversed: false,
   }
 },
 methods: {
   manage_sorting(column) {
     this.sort_reversed = ( this.sort == column.key ) ? !this.sort_reversed : false;
     this.sort = column.key;
   },
   get_key(row) {
     return (
       ( row[this.sort]     === undefined ) ? '' :
       ( row[this.sort].key === undefined ) ? row[this.sort].toString() :
                                              row[this.sort].key.toString()
     );
   },
   get_value(element) {
     return ( element.value === undefined ) ? element : element.value;
   },
 },
 computed: {
   sorted_rows() {
     this.rows.forEach( (r,n) => r.id = n );
     if ( this.sort ) {
       if ( this.sort_reversed ) {
         return this.rows.sort( (a,b) => this.get_key(b).localeCompare(this.get_key(a), {ignorePunctuation: true}) );
       } else {
         return this.rows.sort( (a,b) => this.get_key(a).localeCompare(this.get_key(b), {ignorePunctuation: true}) );
       }
     } else {
       return this.rows;
     }
   }
 },
}
</script>
