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
                            <export-excel
                                class = "btn btn-outline-primary float-right"
                                :data = "data.responses"
                                :fields = "fields"
                                worksheet = "My Worksheet"
                                :name = "data.survey.title">
                                Download Excel
                            </export-excel>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class=" text-primary">
                                <tr>
                                    <th>Survey Title</th>
                                    <th>Date Answered</th>
                                    <th>Responder</th>
                                    <th>Email</th>
                                    <th v-for="(value, key) in data.survey.questions" :key="key">
                                        {{ value.content }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(response, r_key) in data.responses">
                                    <td>{{  response.survey.title  }}</td>
                                    <td>{{ getDate(response.created_at)  }}</td>
                                    <td>{{  response.user.name  }}</td>
                                    <td>{{  response.user.email  }}</td>
                                    <td v-for="(answer, a_key) in response.answers" :key="a_key">
                                        {{ answer.answer }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./report.component.js"></script>