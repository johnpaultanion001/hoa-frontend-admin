<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card card-user">
                <div class="card-header py-2">
                    <h5 class="card-title">{{ $route.meta.title }}</h5>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <form @submit.prevent="update$()">
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label>Status</label>
                                    <select class="form-control py-0" required v-model="data.value.status">
                                        <option :value="true">ON</option>
                                        <option :value="false">OFF</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Title</label>
                                    <input type="text" class="form-control" required v-model="data.value.name" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Icon <small>Visit this link for the icons https://fontawesome.com/icons</small></label>
                                    <input type="text" class="form-control" required v-model="data.value.icon" />
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Output:</label> <br />
                                    <i :class="data.value.icon" class="fa-7x"></i>
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
