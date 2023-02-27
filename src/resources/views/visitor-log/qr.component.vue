<template>
    <div>
        <button class="btn btn-primary btn-block" @click="$bvModal.show('qr')">Scan QR</button>

        <b-modal size="lg" id="qr" centered hide-footer no-close-on-backdrop>
            <template #modal-title>QR Scanner </template>
            <div class="row">
                <div class="col-lg-12">
                    <!-- <button type="button" @click="onDecode(1)">Test</button> -->
                    <qrcode-stream @decode="onDecode"></qrcode-stream>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { alertService } from "../../../services/alert/alert.service";
import { visitorLogService } from "../../../services/visitor-log/visitor-log.service";
import { statuses } from "../../../shared/mockup/statuses.mockup";
export default {
    components: { QrcodeStream },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        async onDecode(id) {
            alertService.loading();
            let visitor = await visitorLogService
                .show(id)
                .then((success) => success.data)
                .catch(() => {
                    alertService.error("Error", "QR not valid");
                });
            if (visitor) {
                await visitorLogService.update(id, { ...visitor, ...{ status_id: statuses[7].id } }).then((success) => {
                    alertService.close();
                    this.$bvModal.hide("qr");
                    this.$emit("event", success.data);
                });
            } else {
                alertService.error("Error", "QR not valid");
            }
        },
    },
};
</script>
