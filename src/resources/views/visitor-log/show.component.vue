<template>
    <div>
        <b-modal size="lg" id="show" centered hide-footer>
            <template #modal-title> Visitor Information </template>
            <div class="row">
                <!--                <div class="col-lg-12">    <img :src="datum.file_identification ? datum.file_identification.full_url : ''" class="img-fluid" alt="Responsive image"></div>-->
                <!--                <div class="col-lg-12 mt-3">{{ datum.name}}</div>-->

                <div class="col-lg-12 table-responsive">
                    <table class="table table-bordered">
                        <tr v-if="config.show_qr">
                            <td colspan="2" class="text-center">
                                <qrcode-vue :value="datum.id.toString()"></qrcode-vue>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">QR Code</td>
                            <td>
                                <a href="javascript:void(0);" @click="config.show_qr = !config.show_qr" class="text text-primary"> {{ config.show_qr ? "Hide" : "Show" }}</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Name</td>
                            <td>{{ datum.name }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Contact Number</td>
                            <td>{{ datum.contact_number }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Person to Visit</td>
                            <td>{{ datum.person_to_visit }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Place to Visit</td>
                            <td>{{ datum.person_to_visit }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Status</td>
                            <td>{{ datum.status.name }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Date</td>
                            <td>{{ datum.date }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Time</td>
                            <td>{{ $formatTime(datum.time) }}</td>
                        </tr>
                        <tr>
                            <td class="w-50 font-weight-bold">Identification</td>
                            <td>
                                <a href="javascript:void(0);" @click="config.show_id = !config.show_id" class="text text-primary"> {{ config.show_id ? "Hide" : "Show" }}</a>
                            </td>
                        </tr>
                        <tr v-if="config.show_id">
                            <td colspan="2">
                                <img :src="datum.file_identification ? datum.file_identification.full_url : ''" class="img-fluid" alt="Responsive image" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <b-button block @click="$bvModal.hide('show')">Close</b-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script src="./show.component.js"></script>
