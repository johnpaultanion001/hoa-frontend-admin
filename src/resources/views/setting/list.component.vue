<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                            <h5 class="card-title">{{ $route.meta.title }}</h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-lg-12">
                            <nav class="nav nav-pills flex-column flex-sm-row border">
                                <a class="flex-sm-fill text-sm-center nav-link border rounded-0" :class="{'active': filter.keys == 'logo'}" @click="search$({keys: 'logo'})" aria-current="page" href="#">Logo</a>
                                <a class="flex-sm-fill text-sm-center nav-link border rounded-0" :class="{'active': filter.keys == 'banner'}"  @click="search$({keys: 'banner'})"  href="#">Banners</a>
                                <a class="flex-sm-fill text-sm-center nav-link border rounded-0" :class="{'active': filter.keys == 'widget'}"   @click="search$({keys: 'page'})"  href="#">Widgets</a>
                            </nav>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in data.data" :key="key">
                                    <td>
                                        <template v-if="value.key == 'page'">
                                            {{ value.value.name }}
                                        </template>
                                        <template v-else-if="value.key == 'banner'">
                                            {{ value.value.page }}
                                        </template>
                                        <template v-else-if="value.key == 'logo'">
                                            <img :src="value.value.full_url" />
                                        </template>
                                    </td>
                                    <td>{{ value.key == "page" ? "widget" : value.key }}</td>

                                    <td class="text-center">
                                        <a class="text text-primary px-1" :href="`${$route.fullPath}/${value.id}/edit?key=${value.key}`">EDIT </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <paginate-component v-if="$toPageCount(data.total, data.per_page) > 1" :page_count="$toPageCount(data.total, data.per_page)" @event="search$" />
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./list.component.js"></script>
