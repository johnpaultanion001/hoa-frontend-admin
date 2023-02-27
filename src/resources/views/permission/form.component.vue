<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card card-user">
                <div class="card-header py-2">
                    <h5 class="card-title">{{ $route.meta.title }}</h5>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <form @submit.prevent=" update$()">
                        <div class="row">

                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label>Role</label>
                                    <input type="text" class="form-control" :value="$route.params.id" readonly />
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-6 py-2" v-for="(value,key) in permissions">
                                <input :true-value="1" :false-value="0" @change="is_change($event,value)" type="checkbox" :checked="is_checked(value)" id="defaultCheck1"> {{value.name}}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 pr-1">
                                <button type="submit" class="btn btn-primary btn-block">
                                    {{ $label($route.params.id, "form_submit") }}
                                </button>
                            </div>
                            <div class="col-6 pl-1">
                                <button type="button" @click="$router.go(-1)" class="btn btn-danger btn-block">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./form.component.js"></script>
