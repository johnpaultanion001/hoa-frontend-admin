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
                                    <select class="form-control py-0" v-model="data.company_id" required >
                                        <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                    </select>
                                </div>
                            </div>
                            

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Display Title*</label>
                                    <input type="text" class="form-control" required v-model="data.title" />
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Display Description*</label>
                                    <textarea class="form-control" required v-model="data.description" />
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Date*</label>
                                            <input type="date" class="form-control" required v-model="data.date" />
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Time*</label>
                                            <input type="time" class="form-control" required v-model="data.time" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Tags</label>
                                    <v-select class="form-group" multiple push-tags taggable :options="tags" v-model="data.tags"></v-select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Orinal Content*</label>
                                    <wysiwyg v-model="data.body" />
                                    <small v-if="$toError(error.errors, 'body').status" class="text-danger">{{ $toError(error.errors, "body").message }}</small>
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
