<template>

    <div class="row align-items-center h-100">
        <div class="col-6 mx-auto">

            <div class="card ">
                <div class="card-header py-3">
                    <h5 class="card-title my-0 font-weight-bolder">Forgot password </h5>
                    <small class="card-title text-secondary">{{ $route.meta.title }} </small>
                </div>
                <hr class="my-0">
                <div class="card-body">
                    <form @submit.prevent="submit$">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" v-model="data.email" class="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email" required>

                        </div>

                        <div class="form-group" v-if="error.message">
                            <div class="alert alert-danger alert-dismissible fade show"  role="alert">
                                {{ error.message }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="form-group" v-if="config.success">
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                Password reset request was sent successfully.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="form-group ">
                            <button type="submit" class="btn btn-primary btn-block "> Continue</button>
                        </div>

                    </form>


                </div>
                <hr class="my-0">
                <div class="card-footer text-center py-3 text-muted">
                   Take me to the <router-link :to="{name: 'login'}" tag="a">login</router-link> page
                </div>
            </div>

        </div>
    </div>

</template>

<script src="./form.component.js"></script>
