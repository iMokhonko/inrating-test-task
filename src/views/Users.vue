<template>
  <div>
    <router-link to="/saveOrEditUser">
      <el-button style="margin-bottom: 25px;" type="primary">Add user</el-button>
    </router-link>

    <el-table empty-text="Users not found" :data="users" style="width: 100%">
      <el-table-column prop="name" label="Name" width="200"></el-table-column>
      <el-table-column prop="surname" label="Surname" width="200"></el-table-column>
      <el-table-column prop="phone" label="Phone" width="200"></el-table-column>
      <el-table-column prop="email" label="Email" width="200"></el-table-column>
      <el-table-column label="Operations" width="200">
        <template slot-scope="scope">
          <el-button type="info" @click="() => {editUser(scope.row.userId)}" size="small">Edit</el-button>
          <el-button type="danger" @click="() => {deleteUser(scope.row.userId)}" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("users/loadUsers");
  },
  computed: {
    users() {
      return this.$store.getters["users/getUsers"];
    }
  },
  methods: {
      deleteUser(userId) {
          this.$store.dispatch('users/deleteUser', userId)
      },
      editUser(userId) {
          this.$router.push(`/saveOrEditUser/${userId}`)
      }
  }
};
</script>

<style lang="scss" scoped>
</style>