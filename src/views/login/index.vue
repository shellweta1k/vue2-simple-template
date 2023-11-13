<template>
  <div class="login-page">
    <div class="login-card">
      <span class="title"> 欢迎登陆 </span>
      <div class="form-container">
        <el-form class="login-form" :rules="rules" ref="form" :model="loginForm" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="loginForm.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password">
                  <!-- <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"> </i> -->
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="handle-block">
        <el-button :loading="loginLoading" class="handle-btn" type="primary" @click="login"> 登 录 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          password: '',
        },
        rules: {
          userName: { required: true, message: '请输入登录用户名', trigger: 'blur' },
          password: { required: true, message: '请输入登录密码', trigger: 'blur' },
        },
        loginLoading: false,
      };
    },
    methods: {
      login() {
        this.loginLoading = true;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$cookies.setItem('token', 'my token');
            this.$router.push({
              path: '/',
            });
            this.loginLoading = false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-page {
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(305deg, #3946c1, #657aab, #73ae92, #6ee371);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-card {
    width: fit-content;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    padding: 20px 40px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      color: #1c8ffa;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .handle-block {
      .handle-btn {
        width: 200px;
        height: 32px;
        line-height: 32px;
        border-radius: 20px;
        padding: 0;
        background: linear-gradient(180deg, #1c8ffa 0%, #3c76f5 100%);
      }
    }
  }
  .form-container {
    width: 300px;
  }
  .login-form {
    .el-form-item {
      .el-form-item__content {
        .el-input {
          width: 100%;
          ::v-deep .el-input__inner {
            border-radius: 0px;
            height: 32px;
            line-height: 32px;
            border: none;
            border-bottom: 1px solid #dcdfe6;
            &:focus {
              border-color: #1c8ffa;
            }
          }
        }
      }
    }
  }
</style>
