<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card card-user">
                <div class="card-header py-2">
                    <h5 class="card-title">Reply</h5>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <form @submit.prevent="$route.params.id ? update$() : store$()">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Body</label>
                                    <textarea v-model="data.content" type="text" class="form-control" placeholder="Content..." required />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 pr-1">
                                <button type="submit" class="btn btn-primary btn-block">Send</button>
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
