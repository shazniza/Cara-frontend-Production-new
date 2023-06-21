<template>
    <div class="q-flex q-justify-center q-pa-md">
      <q-card>
        <q-card-body class="text-center">
          <h4 class="text-center">Governance Checklist</h4>
          <div class="q-mt-md q-column">
          
  <!-- Security dropdwon -->
  <div class="q-pa-md">
    <q-btn-dropdown
      split
      to="/start/pick-quasar-flavour"
      color="teal"
      rounded
      label="Security"
    >
      <q-list>
        <q-item to="/Security" clickable v-close-popup>
          <q-item-section>
            <q-item-label>Security Audit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>

  <!-- Wellness dropdwon -->
  <div class="q-pa-md">
    <q-btn-dropdown
      split
      to="/start/pick-quasar-flavour"
      color="teal"
      rounded
      label="Wellness"
    >
      <q-list>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>Beauty Advisor</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Nutritionist"  clickable v-close-popup>
          <q-item-section>
            <q-item-label>Nutritionist</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Operations" clickable v-close-popup>
          <q-item-section>
            <q-item-label> Operations</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Pharmacists" clickable v-close-popup>
          <q-item-section>
            <q-item-label> Pharmacist</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/lossprevention" clickable v-close-popup>
          <q-item-section>
            <q-item-label> Loss Prevention Audit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>

 <!-- QM dropdwon -->
  <div class="q-pa-md">
    <q-btn-dropdown
      split
      to="/start/pick-quasar-flavour"
      color="teal"
      rounded
      label="Quality Management"
    >
      <q-list>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>Supplier Audit</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>QAA Audit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>

   <!-- Safety dropdwon -->
   <div class="q-pa-md">
    <q-btn-dropdown
      split
      to="/start/pick-quasar-flavour"
      color="teal"
      rounded
      label="Safety"
    >
      <q-list>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>AEON Mall</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>AEON Store</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>AEON BIG</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>AEON FPC</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>

   <!-- Safety dropdwon -->
   <div class="q-pa-md">
    <q-btn-dropdown
      split
      to="/start/pick-quasar-flavour"
      color="teal"
      rounded
      label="Product Compliance"
    >
      <q-list>
        <q-item to="/beauty_advisor" clickable v-close-popup>
          <q-item-section>
            <q-item-label>Product Compliance Audit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>

</div>
        </q-card-body>
      </q-card>
    </div>
  </template>
  