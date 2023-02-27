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
                            <div class="col-12" v-if="$profile().role == 'super_admin'">
                                <div class="form-group">
                                    <label>Assigned To*</label><span class="text-danger">*</span>
                                    <select class="form-control py-0" v-model="data.company_id" required @change="init_users({ paginate: 0, roles: 'client', company_id: data.company_id })">
                                        <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="form-group mb-0"><label>Attachment</label><span class="text-danger">*</span></div>
                                <input type="file" v-if="!data.file_document.full_url" id="avatar" name="avatar" required accept="image/png, image/jpeg" @change="upload$($event, { type: 'document' }, 'file_document')" />
                                <div class="row mt-2" v-if="data.file_document && data.file_document.full_url">
                                    <div class="col-10 col-sm-11 pr-0">
                                        <input type="text" class="form-control" v-model="data.file_document.full_url" readonly />
                                    </div>
                                    <div class="col-2 pl-0 col-sm-1">
                                        <button type="button" @click="data.file_document.full_url = null" class="btn btn-danger btn-block my-0"><i class="fa fa-remove"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mt-3" v-if="$profile().role == 'super_admin'">
                                <div class="form-group">
                                    <label>Assigned To*</label><span class="text-danger">*</span>
                                    <select class="form-control py-0" v-model="data.company_id" required @change="init_users({ paginate: 0, roles: 'client', company_id: data.company_id })">
                                        <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>User</label>
                                    <select class="form-control py-0" v-model="data.user_id">
                                    <option value="0">Select All</option>~
                                        <option v-for="(value, key) in users" :key="key" :value="value.id">{{ value.name }}</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Title</label>
                                    <input type="text" class="form-control" required v-model="data.title" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea class="form-control" required v-model="data.description" />
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
