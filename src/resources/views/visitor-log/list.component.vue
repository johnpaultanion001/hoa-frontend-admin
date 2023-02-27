<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                            <h5 class="card-title">{{ $route.meta.title }}</h5>
                        </div>
                        <div class="col-sm-2">
                            <qr-component @event="$refs.show.show($event)"></qr-component>
                        </div>
                        <div class="col-sm-2">
                            <router-link tag="a" class="btn btn-outline-primary btn-block" :to="{ path: `${$route.fullPath}/create` }">NEW <i class="fa fa-plus"></i> </router-link>
                        </div>
                        
                    </div>
    
                    <search-component q="name" @event="search$" placeholder="Name.."/>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Contact Number</th>

                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Person to Visit</th>
                                    <th>Place to Visit</th>
                                    <th>Status</th>
                                    <th>User</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in data.data" :key="key">
                                    <td>{{ value.name }}</td>
                                    <td>{{ value.contact_number }}</td>
                                    <td>{{ value.date }}</td>
                                    <td>{{ $formatTime(value.time) }}</td>
                                    <td>{{ value.person_to_visit }}</td>
                                    <td>{{ value.place_to_visit }}</td>
                                    <td>{{ value.status.name }}</td>
                                    <td>{{ value.table ? value.table.name : "" }}</td>

                                    <td class="text-center"><a href="javascript:void(0);" @click="$refs.show.show(value)" class="text text-primary">View</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <paginate-component v-if="$toPageCount(data.total, data.per_page) > 1" :page_count="$toPageCount(data.total, data.per_page)" @event="search$" />
                    </div>
                </div>
            </div>
        </div>
        <show-component ref="show" />
    </div>
</template>

<script src="./list.component.js"></script>
