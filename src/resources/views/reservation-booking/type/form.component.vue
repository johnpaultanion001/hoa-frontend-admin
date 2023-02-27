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
                                <div class="form-group mb-0"><label>Image</label><span class="text-danger">*</span></div>
                                <input type="file" v-if="!data.file_cover.full_url" id="avatar" name="avatar" required accept="image/png, image/jpeg" @change="upload$($event, { type: 'cover' }, 'file_cover')" />
                                <div class="row" v-if="data.file_cover.full_url">
                                    <div class="col-lg-12 position-relative">
                                        <a @click="data.file_cover.full_url = null" class="position-absolute text-danger" href="javascript:;" style="left: 30px; top: 7px">
                                            <i class="fa fa-times"></i>
                                        </a>
                                        <img :src="data.file_cover.full_url" class="img-fluid" alt="Responsive image" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-3" v-if="$profile().role == 'super_admin'">
                                <div class="form-group">
                                    <label>Assigned To*</label><span class="text-danger">*</span>
                                    <select class="form-control py-0" v-model="data.company_id" required>
                                        <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Available Slots</label><span class="text-danger">*</span>
                                    <input min="1" v-model="data.metadata.slot" type="number" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'slot').status }" />
                                    <small v-if="$toError(error.errors, 'slot').status" class="text-danger">{{ $toError(error.errors, "slot").message }}</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Type of Service</label><span class="text-danger">*</span>
                                    <input v-model="data.name" type="text" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'name').status }" />
                                    <small v-if="$toError(error.errors, 'name').status" class="text-danger">{{ $toError(error.errors, "name").message }}</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea class="form-control" v-model="data.description"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Availability</label><span class="text-danger">*</span>

                                    <select class="form-control py-1" required @change="set_availability$" :class="{ 'border-danger': $toError(error.errors, 'category').status }" v-model="data.availability">
                                        <option v-for="(value, key) in categories" :value="value.value">{{ value.name }}</option>
                                    </select>
                                    <small v-if="$toError(error.errors, 'name').status" class="text-danger">{{ $toError(error.errors, "category").message }}</small>
                                </div>
                            </div>

                            <div class="col-md-12" v-if="data.availability == 'date'">
                                <div class="form-group">
                                    <label>Date</label><span class="text-danger">*</span>
                                    <date-range-picker class="w-100" v-model="data.metadata.date" :showDropdowns="true" :linkedCalendars="false" @update="upadte_date"></date-range-picker>
                                </div>
                            </div>
                            <div class="col-md-12" v-if="data.availability == 'days'">
                                <div class="form-group mb-0">
                                    <label>Day/s</label><span class="text-danger">*</span>

                                    <div>
                                        <button type="button" class="btn btn-primary btn-sm btn-secondary cursor-default mx-1" v-for="(value, key) in data.metadata.days" :key="key">
                                            {{ days.find((el) => el.value == value).name }} <span class="ml-2 cursor-pointer" v-if="data.metadata.days.length > 1" @click="set_day$(value)"><i class="fa fa-remove"></i></span>
                                        </button>
                                    </div>
                                    <hr class="mx-1" />
                                </div>
                                <div class="row">
                                    <div class="col-lg-3" v-for="(value, key) in days">
                                        <button type="button" class="btn btn-default btn-block border border-1 btn-sm" :class="{ 'btn-secondary': data.metadata.days.find((el) => el == value.value) }" @click="set_day$(value.value)">{{ value.name }}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 mb-3">
                                <div class="form-group mb-0"><label>Time Slot</label><span class="text-danger">*</span></div>
                                <div class="row mr-1 mt-2" v-for="(value, key) in data.metadata.time_slots">
                                    <div class="col-sm-5 pr-0">
                                        <div class="form-group mb-0">
                                            <label>From</label>
                                            <input v-model="value.from" type="time" class="form-control" :disabled="!data.availability" required />
                                        </div>
                                    </div>
                                    <div class="col-sm-5 pr-0">
                                        <div class="form-group mb-0">
                                            <label>To</label>
                                            <input v-model="value.to" type="time" placeholder="time" :disabled="!data.availability" class="form-control" required />
                                        </div>
                                    </div>
                                    <div class="col-sm-2 pr-0">
                                        <button :disabled="data.metadata.time_slots.length == 1" type="button" class="btn btn-danger btn-block mb-0 mt-1-7" @click="$delete(data.metadata.time_slots, key)"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg-12">
                                        <button @click="data.metadata.time_slots.push({})" :disabled="!data.availability" type="button" class="btn btn-block btn-primary"><i class="fa fa-plus"></i></button>
                                    </div>
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
