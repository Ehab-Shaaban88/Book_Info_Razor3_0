﻿var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        ajax: {
            url: '/api/Book',
            type: 'GET',
            dataType:'json'
        },
        columns: [
            { data: 'name', width: '20%' },
            { data: 'auther', width: '20%' },
            { data: 'isbn', width: '20%' },
            {
                data: 'id',
                render:function (data) {
                    return `
                        <div class='text-center'>
                        <a href='/BookList/Edit?id=${data}' class='btn btn-success btn-sm text-white' style='cursor:pointer; width:70px;'>Edit</a>
                        &nbsp;
                        <a class='btn btn-danger text-white btn-sm' style='cursor:pointer; width:70px;' onclick=Delete("api/Book?id=+${data}")>Delete</a>
                        </div>`;
                },
                width: '40%'
            }
        ],
        language: {
            'emptyTable':'No data found'
        },
        width:'100%'
    });
}

function Delete(url) {
    swal({
        title: "Are you sure",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.massage);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.massage);
                    }
                }
            })
        }
    })
}