<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                            <h4 class="card-title">{{ $route.meta.title }}</h4>
                        </div>
                        <div class="col-sm-4">
                            <router-link tag="a" class="btn btn-outline-primary float-right" :to="{ path: `${$route.fullPath}/create` }">NEW <i class="fa fa-plus"></i> </router-link>
                        </div>
                    </div>
                    <search-component q="name" @event="search$" placeholder="Name.."/>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class=" text-primary">
                                <tr>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Date Created
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th class="text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value,key) in data.data">
                                    <td>{{ value.title }}</td>
                                    <td>{{ value.description }}</td>
                                    <td>{{ getDate(value.created_at) }}</td>
                                    <td>{{ !value.enabled? "Disabled" : "Enabled" }}</td>
                                    <td>
                                        
                                        <router-link v-if="!value.enabled" tag="a" class="text text-primary px-1"
                                                 :to="{path: `${$route.fullPath}/${value.id}/edit`}">EDIT
                                        </router-link>
                                        <router-link tag="a" class="text text-success px-1"
                                                 :to="{path: `${$route.fullPath}/${value.id}/report`}">REPORT
                                        </router-link>
                                        <a href="javascript:;" @click="update$(value)" class="text text-danger px-1">{{!value.enabled ? 'ENABLE' : 'DISABLE'}}</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <paginate-component
                            v-if="$toPageCount(data.total, data.per_page ) > 1"
                            :page_count="$toPageCount(data.total, data.per_page )"
                            @event="search$"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./list.component.js"></script>