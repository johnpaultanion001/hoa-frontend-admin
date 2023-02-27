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

                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-primary">
                                <tr>

                                    <th>Name</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in data" :key="key">

                                    <td>{{ value.title }}</td>

                                    <td class="text-center">
                                        <router-link tag="a" class="text text-primary px-1" :to="{ path: `${$route.fullPath}/${value.value}/edit` }">EDIT </router-link>

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
