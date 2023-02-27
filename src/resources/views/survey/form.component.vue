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
                                <div class="form-group">
                                    <label>Survey Title</label>
                                    <input type="text" class="form-control" v-model="data.title" required />
                                    <small v-if="$toError(error.errors, 'title').status" class="text-danger">{{ $toError(error.errors, "title").message }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Survey Description</label>
                                    <textarea type="text" class="form-control" v-model="data.description" required></textarea>
                                    <small v-if="$toError(error.errors, 'description').status" class="text-danger">{{ $toError(error.errors, "description").message }}</small>
                                </div>
                            </div>
                        </div>

                        <div v-for="(value, q_index) in data.questions">
                            <div class="row">
                                <div class="col-md-7 pr-1">
                                    <div class="form-group">
                                        <label>{{ `Question ${q_index + 1} Content`  }}</label>
                                        <input type="text" class="form-control" v-model="data.questions[q_index].content" required />
                                        <small v-if="$toError(error.errors, 'question.content').content" class="text-danger">{{ $toError(error.errors, "question.content").message }}</small>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>{{ `Question ${q_index + 1} Type`  }}</label>
                                        <select class="form-control py-0" v-model="data.questions[q_index].type">
                                            <option value="text">Text</option>
                                            <option value="number">Number</option>
                                            <option value="select">Select</option>
                                            <option value="radio">Radio</option>
                                            <option value="checkbox">Checkbox</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-1">
                                    <div class="form-group">
                                        <label :for="q_index">Required</label>
                                        <input type="checkbox" class="form-control" :id="q_index" v-model="data.questions[q_index].required" />
                                    </div>
                                </div>
                    
                                <div class="col-md-1 pl-1">
                                    <div class="form-group">
                                        <label></label>
                                        <button @click="remove_question(q_index)" class="btn btn-danger btn-block">
                                           Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="data.questions[q_index].type === 'select' || data.questions[q_index].type === 'radio' || data.questions[q_index].type === 'checkbox'">
                                <div v-for="(option, o_index) in data.questions[q_index].options">
                                    <div class="mx-4 row">
                                        <div class="col-md-10 pr-1">
                                            <div class="form-group">
                                                <label>{{ `Option ${o_index + 1} Content`  }}</label>
                                                <input type="text" class="form-control" v-model="data.questions[q_index].options[o_index].content" required />
                                                <small v-if="$toError(error.errors, 'option.content').status" class="text-danger">{{ $toError(error.errors, "option.content").message }}</small>
                                            </div>
                                        </div>
                                        <div class="col-md-2 pl-1">
                                            <div class="form-group">
                                                <label></label>
                                                <button @click="remove_option(q_index, o_index)" class="btn btn-outline-danger btn-block">
                                                Remove Option
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mx-4 row">
                                    <div class="col-md-12 mb-4">
                                        <button class="btn btn-outline-success btn-block" @click="add_option(q_index)">
                                            Add Option
                                        </button>
                                    </div>         
                                </div>
                            </div>
                            <hr class="my-0" />
                        </div>

                        <div class="row">
                            <div class="col-md-12 mb-4">
                                <button class="btn btn-success btn-block" @click="add_question()">
                                    Add Question
                                </button>
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