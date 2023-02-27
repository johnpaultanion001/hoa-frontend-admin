<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                            <h5 class="card-title">{{ $route.meta.title }}</h5>
                        </div>
                        <div class="col-sm-4">
                            <router-link tag="a" class="btn btn-outline-primary float-right" :to="{ path: `${$route.fullPath}/create` }">NEW <i class="fa fa-plus"></i> </router-link>
                        </div>
                    </div>
                    <search-component q="title" @event="search$" placeholder="Title.."/>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date Uploaded</th>
                                    <th class="text-center">Document</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in data.data" :key="key">
                                    <td>{{ value.id }}</td>
                                    <td>{{ value.title }}</td>
                                    <td>{{ value.description }}</td>
                                    <td>
                                        <template v-if="value.file_document">
                                            {{ $formatDate(value.file_document.created_at) }}
                                            {{ $formatTime(value.file_document.created_at) }}
                                        </template>
                                    </td>
                                    <td class="text-center">
                                        <router-link tag="a" class="text text-primary px-1" :to="{ path: `${$route.fullPath}/${value.id}/edit` }">UPDATE </router-link>
                                        <template v-if="value.file_document"> | <a href="javascript:;" @click="download(value.file_document.full_url)" class="text-info">DOWNLOAD</a> </template>
                                    </td>

                                    <td class="text-center">
                                        <router-link tag="a" class="text text-primary px-1" :to="{ path: `${$route.fullPath}/${value.id}/edit` }">EDIT </router-link>
                                        |
                                        <a href="javascript:;" @click="delete$(value.id)" class="text text-danger px-1">DELETE</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <paginate-component v-if="$toPageCount(data.total, data.per_page) > 1" :page_count="$toPageCount(data.total, data.per_page)" @event="search$" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./list.component.js"></script>
