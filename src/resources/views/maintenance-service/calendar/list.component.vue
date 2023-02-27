<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                            <h4 class="card-title">{{ $route.meta.title }}</h4>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 mb-2">
                            <div class="form-group">
                                <label>Type of Service</label>
                                <select class="form-control py-1" v-model="filter.service_id" required @change="search$(filter)">
                                    <option v-for="(value, key) in services" :value="value.id">{{ value.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <calendar @event="set_date" />
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-primary">
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Type of Service</th>
                                    <th class="text-center">Date and Time</th>
                                    <th>Status</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in data.data" :key="key">
                                    <td>{{ value.id }}</td>
                                    <td>{{ value.user ? value.user.name : `${value.personal_details.first_name} ${value.personal_details.last_name}`}} {{ value.personal_details.last_name }}</td>
                                    <td>{{ value.service ? value.service.name : "NA" }}</td>
                                    <td class="text-center"><a href="javascript:;" @click="$refs.show.show(value)" class="text text-primray">VIEW</a></td>
                                    <td>
                                        <select v-model="value.status_id" class="form-control" :disabled="value.id != config.edit_status">
                                            <option v-for="s in statuses" :value="s.id">{{ s.name }}</option>
                                        </select>
                                    </td>
                                    <td class="text-center">
                                        <template v-if="config.edit_status == 0">
                                            <a href="javascript:;" @click="config.edit_status = value.id" class="text text-warning px-1">EDIT STATUS</a>

                                            |
                                            <a href="javascript:;" @click="delete$(value.id)" class="text text-danger px-1">DELETE</a>
                                        </template>
                                        <template v-if="config.edit_status == value.id">
                                            <a href="javascript:;" @click="update$(value.id, value)" class="text text-primary px-1">SAVE</a>
                                            |
                                            <a href="javascript:;" @click="config.edit_status = 0" class="text text-danger px-1">CANCEL</a>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <paginate-component v-if="$toPageCount(data.total, data.per_page) > 1" :page_count="$toPageCount(data.total, data.per_page)" @event="search$" />
                    </div>
                </div>
            </div>
        </div>
        <show-component ref="show"></show-component>
    </div>
</template>

<script src="./list.component.js"></script>
