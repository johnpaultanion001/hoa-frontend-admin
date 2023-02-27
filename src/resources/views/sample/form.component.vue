<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-user">
        <div class="card-header py-2">

          <h5 class="card-title">{{ $route.meta.title }} </h5>
        </div>
        <hr class="my-0">
        <div class="card-body">
          <form @submit.prevent="$route.params.id ? update$() : store$()">
            <div class="row">

              <div class="col-md-6">
                <div class="form-group">
                  <label>First Name</label>
                  <input v-model="data.first_name" type="text" class="form-control"
                         :class="{'border-danger': $toError(error.errors,'first_name').status}" placeholder="First Name">
                  <small v-if="$toError(error.errors,'first_name').status"
                         class="text-danger">{{ $toError(error.errors, 'first_name').message }}</small>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Last Name</label>
                  <input v-model="data.last_name" type="text" class="form-control"
                         :class="{'border-danger': $toError(error.errors,'last_name').status}" placeholder="Last Name">
                  <small v-if="$toError(error.errors,'last_name').status"
                         class="text-danger">{{ $toError(error.errors, 'last_name').message }}</small>
                </div>
              </div>
            </div>


              <div class="row">
                  <div class="col-6 pr-1">
                      <button type="submit" class="btn btn-primary btn-block">
                          {{ $label($route.params.id, 'form_submit') }}
                      </button>
                  </div>
                  <div class="col-6 pl-1">
                      <button type="button" @click="$router.go(-1)" class="btn btn-danger btn-block">
                          Cancel
                      </button>
                  </div>
              </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./form.component.js"></script>
