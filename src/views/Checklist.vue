<template>
    <div class="q-flex q-justify-center q-pa-md">
      <q-card>
        <q-card-body class="text-center">
          <h4 class="text-center">Governance Checklist</h4>
          <div class="q-mt-md q-column">
            <q-btn label="Security" color="primary" to="/Security" /> <br><br><br><br>


  <!-- Wellness dopdwon -->
         

  <!-- Wellness dopdwon -->
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
            <q-item-label  >Beauty Advisor</q-item-label>
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


            <q-btn label="Quality Management" color="primary"  /><br><br><br><br>
            <q-btn label="Safety" color="primary"  /><br><br><br><br>
            <q-btn label="Product Quality" color="primary"  /><br><br><br><br>
          </div>
        </q-card-body>
      </q-card>
    </div>
  </template>
  