<template>
    <div class="row align-items-center h-100">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 mx-auto">
            <div class="card card-user">
                <div class="card-header py-3">
                    <h5 class="card-title my-0 font-weight-bolder">Welcome Back!</h5>
                    <small class="card-title text-secondary">{{ $route.meta.title }} </small>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <form @submit.prevent="login$">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" v-model="data.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" v-model="data.password" class="form-control" id="exampleInputPassword1" placeholder="Password" required />
                        </div>
                        <div class="form-group" v-if="error.message">
                            <div class="alert alert-danger" role="alert">
                                {{ error.message }}
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"><i class="fas fa-sign-in-alt"></i> LOGIN</button>
                        </div>
                        <div class="form-group">
                            <a @click="google$" class="btn btn-light btn-block text-uppercase btn-outline border" href="#"><i class="fa-brands fa-google"></i> Continue with Google</a>
                        </div>
                    </form>
                </div>
                <hr class="my-0" />
                <div class="card-footer text-center py-3">
                    <router-link :to="{ name: 'forgot-password' }" tag="a">Forgot your password?</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./form.component.js"></script>
