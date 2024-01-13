<script>
    export let data;
</script>

<div class="container">
    <div class="row">
        <div class="col-md-6 col-xs-12">
            <img class="img-fluid" src="{data.item.image}" alt="Card cap">
        </div>
        <div class="col-md-6 col-xs-12">
          <h5>{data.item.name}</h5>
          <p><small class="text-muted">{data.item.category}</small></p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Size: </b>{data.item.size}</li>
            <li class="list-group-item"><b>Time: </b>{data.item.time}</li>
            <li class="list-group-item"><b>Season: </b>{data.item.season}</li>
            <li class="list-group-item"><b>Material: </b>{data.item.material}</li>
            <li class="list-group-item"><b>Occasion: </b>{data.item.occasion}</li>
            <li class="list-group-item"><b>Tags: </b>{data.item.tags}</li>
            <li class="list-group-item"><b>Colors: </b>{data.item.colors}</li>
        </ul>
        </div>
    </div>
</div>
