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
                        
                        </div>
                    </div>
                    <search-component q="subject" @event="search$" placeholder="Subject.."/>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-primary">
                                <tr>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th>Body</th>
                                    <th>Replied</th>
                                    <th>Date</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in data.data" :key="key">
                                    <td>{{ value.user ? value.user.email : "N/A" }}</td>
                                    <td>{{ value.subject }}</td>
                                    <td>{{ value.body }}</td>
                                    <td>{{ value.status ? "Yes" : "No" }}</td>
                                    <td>  {{ $formatDate(value.created_at) }}
                                        {{ $formatTime(value.created_at) }} </td>
                                    <td class="text-center">
                                        <router-link v-if="!value.status" tag="a" class="text text-primary px-1" :to="{ path: `${$route.fullPath}/${value.id}/edit` }">Reply </router-link>
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
