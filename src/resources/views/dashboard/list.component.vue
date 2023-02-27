<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-8">
                            <h4 class="card-title">{{ $route.meta.title }}</h4>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 col-sm-12 col-lg-4">
                            <div class="form-group">
                                <label>From Date</label>
                                <input type="date" class="form-control" required v-model="filter.date_from" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 col-lg-4">
                            <div class="form-group">
                                <label>To Date</label>
                                <input type="date" class="form-control" required v-model="filter.date_to" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 col-lg-4 py-lg-3 py-md-3 py-sm-0">
                            <button type="button" @click="list(filter)" class="btn btn-primary btn-block">Search</button>
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col-md-12 col-sm-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h5 class="card-title">Reservation and Booking</h5>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="card-body" id="chart">
                                    <pure-vue-chart
                                        :show-x-axis="true"
                                        :show-values="true"
                                        :use-month-labels="false"
                                        :width="config.chart_width"
                                        :points="[
                                            { label: 'Pending', value: data.reservation.pending },
                                            { label: 'Approved', value: data.reservation.approved },
                                            { label: 'Declined', value: data.reservation.declined },
                                        ]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h5 class="card-title">Maintenance Service</h5>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="card-body" id="chart">
                                    <pure-vue-chart
                                        :show-x-axis="true"
                                        :show-values="true"
                                        :use-month-labels="false"
                                        :width="config.chart_width"
                                        :points="[
                                            { label: 'Pending', value: data.maintenances.pending },
                                            { label: 'Approved', value: data.maintenances.approved },
                                            { label: 'Declined', value: data.maintenances.declined },
                                        ]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col-md-12 col-sm-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h5 class="card-title">Inquiries</h5>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="card-body" id="chart">
                                    <pure-vue-chart
                                        :show-x-axis="true"
                                        :show-values="true"
                                        :use-month-labels="false"
                                        :width="config.chart_width"
                                        :points="[
                                            { label: 'Resolved', value: data.inquiries.resolved },
                                            { label: 'Pending', value: data.inquiries.pending },
                                        ]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 col-sm-12 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h5 class="card-title">Visitors</h5>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="card-body" id="chart">
                                    <pure-vue-chart :show-x-axis="true" :show-values="true" :use-month-labels="false" :width="config.chart_width" :points="[{ label: 'Total', value: data.visitors.total }]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./list.component.js"></script>
