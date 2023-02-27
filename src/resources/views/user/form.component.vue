<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card card-user">
                <div class="card-header py-2">
                    <h5 class="card-title">{{ $route.meta.title }}</h5>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <form @submit.prevent="$route.params.id ? update$() : store$()">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" v-model="data.name" required />
                                    <small v-if="$toError(error.errors, 'name').status" class="text-danger">{{ $toError(error.errors, "name").message }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 pr-1">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="data.email" required :disabled="$route.params.id" />
                                    <small v-if="$toError(error.errors, 'email').status" class="text-danger">{{ $toError(error.errors, "email").message }}</small>
                                </div>
                            </div>

                            <div class="col-md-6 pl-1">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="number" class="form-control" v-model="data.phone_number" />
                                    <small v-if="$toError(error.errors, 'phone_number').status" class="text-danger">{{ $toError(error.errors, "phone_number").message }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 pr-1">
                                <div class="form-group">
                                    <label>Role</label>

                                    <template v-if="data.role == 'super_admin'">
                                        <input type="text" class="form-control" :value="data.role" disabled />
                                    </template>
                                    <template v-else>
                                        <select class="form-control py-0" v-model="data.role" required>
                                            <option v-for="(value, key) in roles" :value="value.value" :key="key" v-if="'super_admin' != value.value" :disabled="$route.params.id && value.value == 'company'">{{ value.title }}</option>
                                        </select>
                                        <small v-if="$toError(error.errors, 'role').status" class="text-danger">{{ $toError(error.errors, "role").message }}</small>
                                    </template>
                                </div>
                            </div>
                            <div class="col-6 pl-1">
                                <div class="form-group">
                                    <label>Status</label>

                                    <select class="form-control py-0" v-model="data.disabled">
                                        <option v-for="(value, key) in statuses" :value="value.value" :key="key">{{ value.title }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="data.role == 'company'">
                            <div class="col-6 pr-1">
                                <div class="form-group">
                                    <label>Client (Sub Domain Prefix) *</label>

                                    <input type="text" class="form-control" v-model="data.user_setting_company.value.client" @keydown="$alpha_numeric($event)" required :disabled="$route.params.id" />
                                    <small v-if="config.user_setting_company_exist" class="text-danger">Invalid Prefix</small>
                                </div>
                            </div>
                            <div class="col-6 pl-1">
                                <div class="form-group">
                                    <label>Admin (Sub Domain Prefix) *</label>
                                    <input type="text" class="form-control" v-model="data.user_setting_company.value.admin" required />
                                    <small v-if="config.user_setting_company_exist" class="text-danger">Invalid Prefix</small>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="data.role != 'client'">
                            <div class="col-12" v-if="['admin', 'staff'].includes(data.role) && $profile().role == 'super_admin'">
                                <div class="form-group">
                                    <label>Assgined To*</label>
                                    <select class="form-control py-0" v-model="data.user_detail.company_id" required>
                                        <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-group my-0 font-weight-bold">
                                    <label>Personal Information</label>
                                </div>
                            </div>
                            <div class="col-4 pr-1">
                                <div class="form-group">
                                    <label>First Name*</label>

                                    <input type="text" class="form-control" v-model="data.user_detail.first_name" required />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label>Middle Name</label>

                                    <input type="text" class="form-control" v-model="data.user_detail.middle_name" />
                                </div>
                            </div>
                            <div class="col-4 pl-1">
                                <div class="form-group">
                                    <label>Last Name*</label>

                                    <input type="text" class="form-control" v-model="data.user_detail.last_name" required />
                                </div>
                            </div>
                        </div>


                        <div class="row" v-if="data.role == 'client'">

                            <div class="col-12">
                                <div class="form-group my-0 font-weight-bold">
                                    <label>Personal Information</label>
                                </div>
                            </div>
                            <div class="col-4 pr-1">
                                <div class="form-group">
                                    <label>First Name*</label>

                                    <input type="text" class="form-control" v-model="data.user_detail.first_name" required />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label>Middle Name</label>

                                    <input type="text" class="form-control" v-model="data.user_detail.middle_name" />
                                </div>
                            </div>
                            <div class="col-4 pl-1">
                                <div class="form-group">
                                    <label>Last Name*</label>
                                    <input type="text" class="form-control" v-model="data.user_detail.last_name" required />
                                </div>
                            </div>
                            <div class="col-4 pr-1">
                                <div class="form-group">
                                    <label>Birthdate</label>

                                    <input type="date" class="form-control" v-model="data.user_detail.birthdate" required />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                    <label>Gender</label>
                                    <input type="text" class="form-control" v-model="data.user_detail.gender" />
                                </div>
                            </div>
                            <div class="col-4 pl-1">
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" class="form-control" v-model="data.user_detail.address" required />
                                </div>
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
