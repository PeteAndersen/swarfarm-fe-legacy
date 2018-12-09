<template>
  <div>{{ monsterNames }}</div>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    allMonsters: gql`
      {
        allMonsters(first: 100) {
          edges {
            cursor
            node {
              name
            }
          }
        }
      }
    `
  },
  computed: {
    monsterNames: function() {
      return this.allMonsters.edges.map(mon => mon.node.name);
    }
  }
};
</script>

<style scoped></style>
