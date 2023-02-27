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
                        <template v-if="config.step == 1">
                            <div class="row">
                                <div class="col-12 mt-3" v-if="$profile().role == 'super_admin'">
                                    <div class="form-group">
                                        <label>Assigned To*</label><span class="text-danger">*</span>
                                        <select class="form-control py-0" v-model="data.company_id" required @change="list_services({ company_id: data.company_id })">
                                            <option v-for="(value, key) in assignees" :value="value.id" :key="key">{{ value.name }} ({{ value.role }} )</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-12" v-for="(value, key) in services" :key="key">
                                    <div class="card">
                                        <img class="card-img-top" :src="value.file_cover ? value.file_cover.full_url : ''" alt="Card image cap" />
                                        <div class="card-body" style="min-height: 1px !important">
                                            <h5 class="card-title">{{ value.name }}</h5>
                                            <a href="#" class="btn btn-primary w-100" @click="(data.service_id = value.id), (config.step = 2)">Select</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="config.step == 2">
                            <div class="row mb-2">
                                <div class="col-lg-12">
                                    <calendar-booking-component v-if="data.service_id" ref="calendar" @set_date="set_booking_date" @search="init_events" />
                                </div>
                            </div>
                        </template>

                        <template v-if="config.step == 3">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>First Name</label><span class="text-danger">*</span>
                                        <input v-model="data.personal_details.first_name" type="text" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'first_name').status }" />
                                        <small v-if="$toError(error.errors, 'first_name').status" class="text-danger">{{ $toError(error.errors, "first_name").message }}</small>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Last Name</label><span class="text-danger">*</span>
                                        <input v-model="data.personal_details.last_name" type="text" class="form-control" required :class="{ 'border-danger': $toError(error.errors, 'last_name').status }" />
                                        <small v-if="$toError(error.errors, 'last_name').status" class="text-danger">{{ $toError(error.errors, "last_name").message }}</small>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Type of Service</label><span class="text-danger">*</span>
                                        <select disabled class="form-control py-1" v-model="data.service_id" required :class="{ 'border-danger': $toError(error.errors, 'service_id').status }">
                                            <option v-for="(value, key) in services" :value="value.id" :key="key">{{ value.name }}</option>
                                        </select>
                                        <small v-if="$toError(error.errors, 'service_id').status" class="text-danger">{{ $toError(error.errors, "service_id").message }}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-for="(value, key) in data.booking_details" :key="key">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Date</label><span class="text-danger">*</span>
                                        <input v-model="value.date" type="text" class="form-control" required disabled :class="{ 'bg-white': config.step == 2 }" readonly />
                                        <!-- <small v-if="$toError(error.errors, 'date').status" class="text-danger">{{ $toError(error.errors, "date").message }}</small> -->
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Time</label><span class="text-danger">*</span>
                                        <v-select class="calendar" multiple :options="set_time_slots(value.date)" label="name" v-model="value.time">
                                            <template #search="{ attributes, events }">
                                                <input class="vs__search" :required="!value.time.length" v-bind="attributes" v-on="events" />
                                            </template>
                                        </v-select>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="row">
                            <div class="col-6 pr-1" v-if="config.step == 3">
                                <button type="submit" class="btn btn-primary btn-block" v-if="config.step > 1">
                                    {{ $label($route.params.id, "form_submit") }}
                                </button>
                            </div>
                            <div class="col-6 pr-1" v-if="config.step == 2">
                                <a href="javascript:;" @click="config.step = 3" class="btn btn-primary btn-block" v-if="config.step > 1">Next</a>
                            </div>
                            <div :class="{ ['col-12 pl-3']: config.step == 1 }" class="col-6 pl-1">
                                <template v-if="config.step > 1">
                                    <button type="button" @click="(config.step = config.step - 1), (data.booking_details = [])" class="btn btn-danger btn-block">Back</button>
                                </template>
                                <template v-else>
                                    <button type="button" @click="$router.go(-1)" class="btn btn-danger btn-block">Cancel</button>
                                </template>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./form.component.js"></script>
