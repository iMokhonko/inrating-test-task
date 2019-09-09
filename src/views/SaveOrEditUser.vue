<template>
  <div>
    <form action="#">
      <label class="form-label" for="firstname">First name</label>
      <el-input
        id="firstname"
        placeholder="Enter firstname"
        maxlength="50"
        show-word-limit
        v-model="user.name"
        @input="$v.user.name.$touch()"
      ></el-input>
      <span
        v-if="$v.user.name.$dirty && !$v.user.name.required"
        class="invalid"
      >First name is required</span>
      <span
        v-if="$v.user.name.$dirty && !$v.user.name.minLength"
        class="invalid"
      >First name is minimum 2 symbols</span>
      <span
        v-if="$v.user.name.$dirty && !$v.user.name.maxLength"
        class="invalid"
      >First name is max 50 symbols</span>

      <label class="form-label" for="surname">Second name</label>
      <el-input
        id="surname"
        placeholder="Enter surname"
        maxlength="50"
        show-word-limit
        v-model="user.surname"
        @input="$v.user.surname.$touch()"
      ></el-input>
      <span
        v-if="$v.user.surname.$dirty && !$v.user.surname.required"
        class="invalid"
      >surname is required</span>
      <span
        v-if="$v.user.surname.$dirty && !$v.user.surname.minLength"
        class="invalid"
      >surname is minimum 2 symbols</span>
      <span
        v-if="$v.user.surname.$dirty && !$v.user.surname.maxLength"
        class="invalid"
      >surname is max 50 symbols</span>

      <label class="form-label" for="phone">Phone number</label>
      <el-input
        id="phone"
        placeholder="Enter phone number"
        maxlength="50"
        show-word-limit
        v-model="user.phone"
        @input="$v.user.phone.$touch()"
      ></el-input>

      <span
        v-if="$v.user.phone.$dirty && !$v.user.phone.required"
        class="invalid"
      >phone is required</span>


      <label class="form-label" for="email">Email</label>
      <el-input
        id="email"
        placeholder="Enter email"
        maxlength="50"
        show-word-limit
        v-model="user.email"
        @input="$v.user.email.$touch()"
      ></el-input>

      <span
        v-if="$v.user.email.$dirty && !$v.user.email.required"
        class="invalid"
      >email is required</span>
      <span
        v-if="$v.user.email.$dirty && !$v.user.email.email"
        class="invalid"
      >Email is invalid</span>

      <el-button
        @click="addOrEditUser"
        style="margin-top: 25px;display:block;"
        :disabled="$v.user.$invalid"
        type="primary"
      >{{ userId ? 'Edit user' : 'Add user' }}</el-button>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        name: "",
        surname: "",
        phone: "",
        email: ""
      }
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      surname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      email: {
        required,
        email
      },
      phone: {
        required
      }
    }
  },
  mounted() {
    if (this.userId) {
      this.$store.dispatch("users/getUser", this.userId).then(user => {
        this.user = user;
      });
    }
  },
  computed: {
    userId() {
      return parseInt(this.$route.params.userId);
    }
  },
  methods: {
    addOrEditUser() {
      this.$store.dispatch("users/addOrEditUser", this.user).then(() => {
        const message = this.userId ? "User edited" : "User added";
        this.$message({
          message: message,
          type: "success"
        });
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-label {
  padding: 25px 0 5px 0;
  font-weight: bold;
  display: block;
}

.invalid {
  font-style: italic;
  color: red;
  font-size: 13px;
  margin-left: 15px;
}
</style>