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
                                <input ref="FileInput" v-if="!data.value.full_url" type="file" @change="on_select_file"/>
                                <div class="row mt-2" v-show="cropper.file">
                                    <div class="col-lg-12 position-relative">

                                        <VueCropper v-show="cropper.file" ref="cropper" :zoomable="false"
                                                    :src="cropper.file" alt="Source Image"></VueCropper>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="row">
                                            <div class="col-6 pr-1">
                                                <button type="button" @click="save_crop" class="btn btn-outline-primary btn-block">
                                                    Crop
                                                </button>
                                            </div>
                                            <div class="col-6 pl-1">
                                                <button type="button" @click="cropper.file = ''"
                                                        class="btn btn-outline-danger btn-block">Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" v-if="data.value.full_url">
                                    <div class="col-lg-12 position-relative">
                                        <a @click="data.value.full_url = null" class="position-absolute text-danger"
                                           href="javascript:;" style="left: 30px; top: 7px">
                                            <i class="fa fa-times"></i>
                                        </a>
                                        <img :src="data.value.full_url" class="img-fluid" alt="Responsive image"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label>Title</label>
                                    <input type="text" class="form-control" required v-model="data.value.title" />
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea class="form-control" required v-model="data.value.description"></textarea>
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
