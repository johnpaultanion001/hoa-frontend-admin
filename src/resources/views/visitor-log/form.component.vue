<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card card-user">
                <div class="card-header py-2">
                    <h5 class="card-title">{{ $route.meta.title }}</h5>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <form @submit.prevent="store$">
                        <div class="row">
                            <div class="col-12" v-if="$profile().role == 'super_admin'">
                                <div class="form-group">
                                    <label>Assigned To*</label><span class="text-danger">*</span>
                                    <select class="form-control py-0" v-model="data.company_id" required @change="init_users({ paginate: 0, roles: 'client', company_id: data.company_id })">
                                        <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>User</label><span class="text-danger">*</span>
                                    <select class="form-control py-1" required v-model="data.table_id">
                                        <option v-for="(value, key) in users" :value="value.id">{{ value.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Name</label><span class="text-danger">*</span>
                                    <input v-model="data.name" type="text" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'name').status }" />
                                    <small v-if="$toError(error.errors, 'name').status" class="text-danger">{{ $toError(error.errors, "name").message }}</small>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Contact Number</label><span class="text-danger">*</span>
                                    <input v-model="data.contact_number" type="text" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'contact_number').status }" />
                                    <small v-if="$toError(error.errors, 'contact_number').status" class="text-danger">{{ $toError(error.errors, "contact_number").message }}</small>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Email</label><span class="text-danger">*</span>
                                    <input v-model="data.email" type="email" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'email').status }" />
                                    <small v-if="$toError(error.errors, 'email').status" class="text-danger">{{ $toError(error.errors, "email").message }}</small>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Person to Visit</label><span class="text-danger">*</span>
                                    <input v-model="data.person_to_visit" type="text" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'person_to_visit').status }" />
                                    <small v-if="$toError(error.errors, 'person_to_visit').status" class="text-danger">{{ $toError(error.errors, "person_to_visit").message }}</small>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Date</label><span class="text-danger">*</span>
                                    <input v-model="data.date" type="date" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'date').status }" />
                                    <small v-if="$toError(error.errors, 'date').status" class="text-danger">{{ $toError(error.errors, "date").message }}</small>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Time</label><span class="text-danger">*</span>
                                    <input v-model="data.time" type="time" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'time').status }" />
                                    <small v-if="$toError(error.errors, 'time').status" class="text-danger">{{ $toError(error.errors, "time").message }}</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group mb-0"><label>Identification</label><span class="text-danger">*</span></div>
                                <input type="file" v-if="!data.file_identification.full_url" id="avatar" name="avatar" required accept="image/png, image/jpeg" @change="upload$($event, { type: 'identification' }, 'file_identification')" />
                                <div class="row" v-if="data.file_identification.full_url">
                                    <div class="col-lg-12 position-relative">
                                        <a @click="data.file_identification.full_url = null" class="position-absolute text-danger" href="javascript:;" style="left: 30px; top: 7px">
                                            <i class="fa fa-times"></i>
                                        </a>
                                        <img :src="data.file_identification.full_url" class="img-fluid" alt="Responsive image" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
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
